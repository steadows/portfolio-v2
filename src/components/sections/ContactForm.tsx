"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HUDBracket } from "@/components/effects/HUDBracket";
import { cn } from "@/lib/utils";
import { formFields, contactCopy } from "@/data/contact";

// ── Zod Schema ──────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  message: z.string().min(10, "Message too short — minimum 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ── Framer Motion Variants (stable — defined outside component) ─────────────

const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
} as const;

const successVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
} as const;

const pulseRingVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: [1, 1.8, 2.5] as number[],
    opacity: [0.6, 0.3, 0] as number[],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" as const },
  },
};

// ── Component ───────────────────────────────────────────────────────────────

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(data: ContactFormValues) {
    // TODO: Wire to Supabase in Phase 9
    // eslint-disable-next-line no-console
    console.log("[CONTACT FORM] Submission:", data);
    setSubmitted(true);
  }

  return (
    <HUDBracket
      label={contactCopy.formLabel}
      status={submitted ? "SENT" : contactCopy.formStatus}
      accentColor={submitted ? "green" : "cyan"}
      corners={false}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          /* ── Success State ── */
          <motion.div
            key="success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6 py-12 text-center"
          >
            {/* Animated pulse ring */}
            <div className="relative flex items-center justify-center">
              {!prefersReducedMotion && (
                <motion.div
                  variants={pulseRingVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute h-16 w-16 rounded-full border border-accent-green/40"
                  aria-hidden="true"
                />
              )}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-green/30 bg-accent-green/5">
                <svg
                  className="h-8 w-8 text-accent-green drop-glow-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold tracking-wider text-accent-green text-glow-green">
                {contactCopy.successHeading}
              </h3>
              <p className="max-w-sm text-sm text-text-secondary">
                {contactCopy.successMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                form.reset();
              }}
              className={cn(
                "mt-2 border border-text-muted px-6 py-2",
                "font-heading text-xs tracking-wider text-text-secondary",
                "transition-all duration-300",
                "hover:border-accent-cyan hover:text-accent-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              )}
            >
              SEND ANOTHER
            </button>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.div
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {formFields.map((fieldMeta) => (
                  <FormField
                    key={fieldMeta.name}
                    control={form.control}
                    name={fieldMeta.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-[11px] tracking-[0.2em] text-accent-cyan/80">
                          {fieldMeta.label}
                        </FormLabel>
                        <FormControl>
                          {fieldMeta.type === "textarea" ? (
                            <Textarea
                              placeholder={fieldMeta.placeholder}
                              className={cn(
                                "min-h-[140px] resize-none",
                                "rounded-none border-white/10 bg-bg-surface",
                                "font-mono text-sm text-text-primary placeholder:text-text-muted/50",
                                "focus-visible:border-accent-cyan/40 focus-visible:ring-accent-cyan/20"
                              )}
                              {...field}
                            />
                          ) : (
                            <Input
                              type={fieldMeta.type}
                              placeholder={fieldMeta.placeholder}
                              className={cn(
                                "rounded-none border-white/10 bg-bg-surface",
                                "font-mono text-sm text-text-primary placeholder:text-text-muted/50",
                                "focus-visible:border-accent-cyan/40 focus-visible:ring-accent-cyan/20"
                              )}
                              {...field}
                            />
                          )}
                        </FormControl>
                        <FormMessage className="font-heading text-[10px] tracking-wider text-accent-red" />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Submit Button */}
                <motion.div
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.02 }
                  }
                  whileTap={
                    prefersReducedMotion ? undefined : { scale: 0.98 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className={cn(
                      "w-full border border-accent-cyan px-8 py-3",
                      "font-heading text-sm tracking-wider text-accent-cyan",
                      "transition-all duration-300",
                      "hover:bg-accent-cyan/10 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {form.formState.isSubmitting
                      ? "SENDING..."
                      : "SEND MESSAGE"}
                  </button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </HUDBracket>
  );
}
