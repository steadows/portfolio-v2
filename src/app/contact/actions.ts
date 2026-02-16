"use server";

import { createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export interface SubmitContactResult {
  success: boolean;
  error?: string;
}

type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];

export async function submitContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<SubmitContactResult> {
  try {
    const supabase = createServerClient();

    const row: MessageInsert = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
    };

    const { error } = await supabase.from("messages").insert(row);

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
