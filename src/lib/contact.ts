import { z } from "zod";

// The Unicode flag counts code points, matching PostgreSQL char_length.
export const contactSchema = z.object({
  name: z.string().trim()
    .min(1, "Name is required")
    .regex(/^[\s\S]{0,120}$/u, "Use 120 characters or fewer for your name")
    .regex(/^[^\p{Cc}\p{Cs}\p{Zl}\p{Zp}]*$/u, "Use a single line of text for your name"),
  email: z.string().trim().toLowerCase()
    .min(1, "Email is required")
    .max(254, "Use 254 characters or fewer for your email")
    .pipe(z.email("Invalid email format")),
  message: z.string().trim()
    .regex(/^[\s\S]{10,5000}$/u, "Use 10 to 5,000 characters for your message")
    .refine(value => !/(?![\t\r\n])[\p{Cc}\p{Cs}]/u.test(value),
      "Use text, tabs, and line breaks in your message"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const invalidContactError = "Check your name, email, and message and try again.";
export const contactSubmitError = "We couldn't confirm your message was saved. Please try again.";
