"use server";

import { Resend } from "resend";
import { contactSchema, contactSubmitError, invalidContactError } from "@/lib/contact";
import { createServerClient } from "@/lib/supabase/server";

export type SubmitContactResult =
  | { success: true }
  | { success: false; error: typeof invalidContactError | typeof contactSubmitError };

const NOTIFICATION_TO = "steve@steve-meadows.com";
const NOTIFICATION_FROM = "Portfolio Contact <noreply@steve-meadows.com>";

export async function submitContactMessage(data: unknown): Promise<SubmitContactResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: invalidContactError };
  }

  try {
    const { error } = await createServerClient().from("messages").insert(parsed.data);
    if (error) {
      console.error("[CONTACT] Message insert failed.");
      return { success: false, error: contactSubmitError };
    }
  } catch {
    console.error("[CONTACT] Message storage unavailable.");
    return { success: false, error: contactSubmitError };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[CONTACT] Email notification skipped.");
    return { success: true };
  }

  const { name, email, message } = parsed.data;
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: NOTIFICATION_FROM,
      to: NOTIFICATION_TO,
      subject: `New message from ${name}`,
      replyTo: email,
      text: [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n"),
    });
    if (error) {
      console.error("[CONTACT] Email notification failed.");
    } else {
      console.log("[CONTACT] Email notification sent.");
    }
  } catch {
    console.error("[CONTACT] Email notification unavailable.");
  }
  return { success: true };
}
