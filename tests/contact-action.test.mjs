// Run with node --test tests/contact-action.test.mjs
import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const stub = fileURLToPath(new URL("./fixtures/contact-providers.mjs", import.meta.url));
const jiti = createJiti(import.meta.url, {
  alias: {
    "@/lib/supabase/server": stub,
    resend: stub,
    "@": fileURLToPath(new URL("../src", import.meta.url)),
  },
  fsCache: false,
});
const { createServerClient: connect, createMailer: mailer } = await jiti.import(stub);
const { contactSubmitError, invalidContactError } = await jiti.import("@/lib/contact");
const { submitContactMessage } = await jiti.import("@/app/contact/actions");

const valid = { name: "Ada", email: "ada@example.org", message: "Hello there!" };
const privateDetail = "mock provider detail that must stay private";
let from, insert, send, diagnostics;

beforeEach(t => {
  process.env.RESEND_API_KEY = "mock-only";
  insert = t.mock.fn(async () => ({ error: null }));
  from = t.mock.fn(() => ({ insert }));
  connect.mock.resetCalls();
  connect.mock.mockImplementation(() => ({ from }));
  send = t.mock.fn(async () => ({ data: { id: privateDetail }, error: null }));
  mailer.mock.resetCalls();
  mailer.mock.mockImplementation(() => ({ send }));
  diagnostics = [];
  for (const level of ["log", "warn", "error"]) {
    t.mock.method(console, level, (...args) => diagnostics.push(args));
  }
});

test("invalid submissions return a fixed error before either client is constructed", async () => {
  const invalid = [
    null, [], {}, "message", { ...valid, email: null }, { ...valid, message: 123 },
    { ...valid, name: " \t " }, { ...valid, name: "😀".repeat(121) },
    { ...valid, name: "Two\nlines" }, { ...valid, email: "no-domain" },
    { ...valid, email: "ada'@example.org" },
    { ...valid, email: "a".repeat(243) + "@example.org" },
    { ...valid, message: "   123456789   " }, { ...valid, message: "😀".repeat(9) },
    { ...valid, message: "a".repeat(5001) }, { ...valid, message: "Hello\0there!" },
    { ...valid, message: "Unpaired surrogate \ud800" },
  ];
  for (const input of invalid) {
    assert.deepEqual(await submitContactMessage(input), { success: false, error: invalidContactError });
  }
  assert.equal(connect.mock.callCount(), 0);
  assert.equal(mailer.mock.callCount(), 0);
  assert.deepEqual(diagnostics, []);
});

test("saves only normalized contact fields before notifying the fixed recipient", async () => {
  const message = "Hello!\nHere\tis my message.";
  let finishInsert;
  const stored = new Promise(resolve => { finishInsert = resolve; });
  insert.mock.mockImplementation(() => stored);
  const submission = submitContactMessage({
    name: "  Ada  ", email: " ADA@Example.Org ", message: `\n${message}  `,
    to: "other@example.org", id: "ignored", table: "ignored",
  });
  assert.deepEqual(from.mock.calls.map(call => call.arguments), [["messages"]]);
  assert.deepEqual(insert.mock.calls.map(call => call.arguments), [[{ ...valid, message }]]);
  assert.equal(mailer.mock.callCount(), 0);
  finishInsert({ error: null });
  assert.deepEqual(await submission, { success: true });
  assert.deepEqual(send.mock.calls.map(call => call.arguments), [[{
    from: "Portfolio Contact <noreply@steve-meadows.com>",
    to: "steve@steve-meadows.com",
    replyTo: valid.email,
    subject: "New message from Ada",
    text: `Name: Ada\nEmail: ada@example.org\n\nMessage:\n${message}`,
  }]]);
  assert.deepEqual(diagnostics, [["[CONTACT] Email notification sent."]]);
});

test("preserves an internal apostrophe in the normalized email and reply-to", async () => {
  const email = "o'neil+work@example.org";
  assert.deepEqual(await submitContactMessage({ ...valid, email: email.toUpperCase() }), { success: true });
  assert.equal(insert.mock.calls[0].arguments[0].email, email);
  assert.equal(send.mock.calls[0].arguments[0].replyTo, email);
});

test("accepts inclusive normalized length limits in Unicode code points", async () => {
  const fields = {
    name: "😀".repeat(120),
    email: `${"a".repeat(64)}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(61)}`,
  };
  for (const length of [10, 5000]) {
    const message = "😀".repeat(length);
    assert.deepEqual(await submitContactMessage({ ...fields, message: ` ${message} ` }), { success: true });
    assert.deepEqual(insert.mock.calls.at(-1).arguments, [{ ...fields, message }]);
  }
});

for (const failure of ["setup throws", "insert rejects", "insert returns an error"]) {
  test(`storage failure (${failure}) produces a safe error and skips notification`, async () => {
    if (failure === "setup throws") {
      connect.mock.mockImplementation(() => { throw new Error(privateDetail); });
    } else if (failure === "insert rejects") {
      insert.mock.mockImplementation(async () => { throw new Error(privateDetail); });
    } else {
      insert.mock.mockImplementation(async () => ({ error: { message: privateDetail } }));
    }
    assert.deepEqual(await submitContactMessage(valid), { success: false, error: contactSubmitError });
    assert.equal(mailer.mock.callCount(), 0);
    assert.deepEqual(diagnostics, [[failure === "insert returns an error"
      ? "[CONTACT] Message insert failed." : "[CONTACT] Message storage unavailable."]]);
  });
}

for (const failure of ["disabled", "setup throws", "send rejects", "send returns an error"]) {
  test(`notification failure (${failure}) preserves the saved submission`, async () => {
    let expected = "[CONTACT] Email notification unavailable.";
    if (failure === "disabled") {
      delete process.env.RESEND_API_KEY;
      expected = "[CONTACT] Email notification skipped.";
    } else if (failure === "setup throws") {
      mailer.mock.mockImplementation(() => { throw new Error(privateDetail); });
    } else if (failure === "send rejects") {
      send.mock.mockImplementation(async () => { throw new Error(privateDetail); });
    } else {
      send.mock.mockImplementation(async () => ({ error: { message: privateDetail } }));
      expected = "[CONTACT] Email notification failed.";
    }
    assert.deepEqual(await submitContactMessage(valid), { success: true });
    assert.equal(insert.mock.callCount(), 1);
    assert.equal(mailer.mock.callCount(), failure === "disabled" ? 0 : 1);
    assert.deepEqual(diagnostics, [[expected]]);
  });
}
