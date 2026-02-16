"use server";

import { Resend } from "resend";
import { createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export interface SubmitContactResult {
  success: boolean;
  error?: string;
}

type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];

const NOTIFICATION_TO = "steve@steve-meadows.com";
const NOTIFICATION_FROM = "Portfolio Contact <noreply@steve-meadows.com>";

export async function submitContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<SubmitContactResult> {
  try {
    const supabase = createServerClient();

    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();
    const message = data.message.trim();

    const row: MessageInsert = { name, email, message };
    const { error } = await supabase.from("messages").insert(row);

    if (error) {
      console.error("[CONTACT] Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    // Send email notification (non-blocking — don't fail the form if email fails)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resend.emails
        .send({
          from: NOTIFICATION_FROM,
          to: NOTIFICATION_TO,
          subject: `New message from ${name}`,
          replyTo: email,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            ``,
            `Message:`,
            message,
          ].join("\n"),
        })
        .catch((err) => console.error("[CONTACT] Resend error:", err));
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[CONTACT] Server action error:", err);
    return { success: false, error: message };
  }
}
