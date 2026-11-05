"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { partnershipInterests } from "@/content/sponsorship";
import { contactPage } from "@/content/contact";
import { partnershipEnquirySchema, type PartnershipEnquiry } from "@/lib/validation/enquiry";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { EnquiryShell } from "./EnquiryShell";
import { Field, Honeypot, Input, Textarea, describedBy } from "./Field";
import { useEnquiry } from "./useEnquiry";

const messageHint = "Share your objectives and the kind of collaboration you have in mind.";

export function PartnershipForm({ className }: { className?: string }) {
  const uid = useId();
  const f = (name: string) => `${uid}-${name}`;
  const { state, submit, reset } = useEnquiry();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnershipEnquiry>({
    resolver: zodResolver(partnershipEnquirySchema),
    mode: "onTouched",
    defaultValues: { name: "", company: "", email: "", phone: "", website: "", message: "", company_website: "" },
  });

  return (
    <EnquiryShell state={state} onReset={reset}>
      <form
        noValidate
        onSubmit={handleSubmit((data) => submit({ kind: "partnership", data }))}
        className={cn("relative grid gap-6 sm:grid-cols-2", className)}
        aria-label="Partnership enquiry"
      >
        <Field id={f("name")} label="Full Name" error={errors.name?.message}>
          <Input autoComplete="name" {...describedBy(f("name"), errors.name?.message)} {...register("name")} />
        </Field>
        <Field id={f("company")} label="Company / Organisation" error={errors.company?.message}>
          <Input autoComplete="organization" {...describedBy(f("company"), errors.company?.message)} {...register("company")} />
        </Field>
        <Field id={f("email")} label="Work Email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" inputMode="email" {...describedBy(f("email"), errors.email?.message)} {...register("email")} />
        </Field>
        <Field id={f("phone")} label="Phone Number" optional error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" inputMode="tel" {...describedBy(f("phone"), errors.phone?.message)} {...register("phone")} />
        </Field>

        <fieldset className="sm:col-span-2" aria-describedby={errors.interest ? f("interest-error") : undefined}>
          <legend className="text-small font-medium text-fg">Partnership Interest</legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {partnershipInterests.map((interest) => (
              <label key={interest} className="group relative cursor-pointer">
                <input type="radio" value={interest} className="peer sr-only" {...register("interest")} />
                <span className="inline-flex h-11 items-center rounded-button border border-line px-5 text-small text-muted transition-[border-color,background-color,color] duration-(--rc-motion-fast) group-hover:border-line-strong group-hover:text-fg peer-checked:border-accent peer-checked:bg-accent/15 peer-checked:text-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                  {interest}
                </span>
              </label>
            ))}
          </div>
          {errors.interest && (
            <p id={f("interest-error")} role="alert" className="mt-2 text-small text-danger">
              {errors.interest.message}
            </p>
          )}
        </fieldset>

        <Field id={f("website")} label="Website / Company URL" optional error={errors.website?.message} className="sm:col-span-2">
          <Input type="url" inputMode="url" placeholder="https://" autoComplete="url" {...describedBy(f("website"), errors.website?.message)} {...register("website")} />
        </Field>
        <Field id={f("message")} label="Message" error={errors.message?.message} className="sm:col-span-2" hint={messageHint}>
          <Textarea {...describedBy(f("message"), errors.message?.message, messageHint)} {...register("message")} />
        </Field>
        <Honeypot {...register("company_website")} />

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-small text-subtle">
            Your details are only used to respond to this enquiry. See our{" "}
            <Link href="/privacy" className="text-muted underline underline-offset-4 hover:text-fg">
              privacy notice
            </Link>
            .
          </p>
          <Button type="submit" size="lg" icon="arrow" disabled={isSubmitting}>
            {contactPage.pathways.partnership.submit}
          </Button>
        </div>
      </form>
    </EnquiryShell>
  );
}
