"use server";

import { createServerClient } from "@/lib/supabase/server";

export interface SubmitContactResult {
  success: boolean;
  error?: string;
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<SubmitContactResult> {
  try {
    const supabase = createServerClient();

    const { error } = await supabase.from("messages").insert({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
    });

    if (error) {
      console.error("[CONTACT] Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[CONTACT] Server action error:", err);
    return { success: false, error: message };
  }
}
