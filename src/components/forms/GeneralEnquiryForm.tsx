"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { contactPage, generalSubjects, type GeneralSubject } from "@/content/contact";
import { generalEnquirySchema, type GeneralEnquiry } from "@/lib/validation/enquiry";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { EnquiryShell } from "./EnquiryShell";
import { Field, Honeypot, Input, Select, Textarea, describedBy } from "./Field";
import { useEnquiry } from "./useEnquiry";

export function GeneralEnquiryForm({ defaultSubject, className }: { defaultSubject?: GeneralSubject; className?: string }) {
  const uid = useId();
  const f = (name: string) => `${uid}-${name}`;
  const { state, submit, reset } = useEnquiry();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GeneralEnquiry>({
    resolver: zodResolver(generalEnquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject ?? generalSubjects[0],
      message: "",
      company_website: "",
    },
  });

  return (
    <EnquiryShell state={state} onReset={reset}>
      <form
        noValidate
        onSubmit={handleSubmit((data) => submit({ kind: "general", data }))}
        className={cn("relative grid gap-6 sm:grid-cols-2", className)}
        aria-label="General enquiry"
      >
        <Field id={f("name")} label="Full Name" error={errors.name?.message}>
          <Input autoComplete="name" {...describedBy(f("name"), errors.name?.message)} {...register("name")} />
        </Field>
        <Field id={f("email")} label="Email Address" error={errors.email?.message}>
          <Input type="email" autoComplete="email" inputMode="email" {...describedBy(f("email"), errors.email?.message)} {...register("email")} />
        </Field>
        <Field id={f("phone")} label="Phone Number" optional error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" inputMode="tel" {...describedBy(f("phone"), errors.phone?.message)} {...register("phone")} />
        </Field>
        <Field id={f("subject")} label="Subject" error={errors.subject?.message}>
          <Select {...describedBy(f("subject"), errors.subject?.message)} {...register("subject")}>
            {generalSubjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
        <Field id={f("message")} label="Your Message" error={errors.message?.message} className="sm:col-span-2">
          <Textarea {...describedBy(f("message"), errors.message?.message)} {...register("message")} />
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
            {contactPage.pathways.general.submit}
          </Button>
        </div>
      </form>
    </EnquiryShell>
  );
}
