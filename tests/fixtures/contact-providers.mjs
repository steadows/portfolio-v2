import { mock } from "node:test";

export const createServerClient = mock.fn();
export const createMailer = mock.fn();

export class Resend {
  constructor() {
    this.emails = createMailer();
  }
}
