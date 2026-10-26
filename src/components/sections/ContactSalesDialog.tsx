"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { CountryCodeSelect } from "@/components/ui/CountryCodeSelect";
import { SelectField } from "@/components/ui/SelectField";
import {
  DEFAULT_COUNTRY,
  digitRange,
  validatePhone,
  type Country,
} from "@/lib/countries";
import { validateCompany, validateEmail, validateName } from "@/lib/validation";
import {
  InquiryError,
  submitContactSales,
  type ContactSalesPayload,
} from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "Marketing & Advertising",
  "Information Technology",
  "E-commerce & Retail",
  "Healthcare",
  "Finance",
  "Education",
  "Media & Entertainment",
  "Travel & Hospitality",
  "Real Estate",
  "Other",
];

/** The API requires an inquiry of at least 5 characters. */
const MIN_INQUIRY = 5;
const MAX_INQUIRY = 5000;

const INITIAL = {
  first_name: "",
  last_name: "",
  email: "",
  company_name: "",
  phone_number: "",
  industry: "",
  inquiry: "",
};

type FieldName = keyof typeof INITIAL;
type FieldErrors = Partial<Record<FieldName, string>>;

type Props = {
  open: boolean;
  onClose: () => void;
};

/** Inline validation message shown beneath a field. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.8125rem] text-[#d92d20]">
      {message}
    </p>
  );
}

export function ContactSalesDialog({ open, onClose }: Props) {
  const [form, setForm] = useState(INITIAL);
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Per-field messages, plus which fields have been interacted with, so a
  // pristine form does not shout at someone who has not typed yet.
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );

  const titleId = useId();
  const errorId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Lock background scrolling while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the dialog once it opens.
  useEffect(() => {
    if (!open) return;
    const target = success ? closeButtonRef.current : firstFieldRef.current;
    const id = window.setTimeout(() => target?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open, success]);

  // Close on Escape, and keep Tab focus inside the dialog.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Cancel an in-flight request if the dialog unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  if (!open) return null;

  const phoneDigits = form.phone_number.replace(/\D/g, "");
  const { max: maxDigits } = digitRange(country);

  /** Validate one field against the given form state. */
  const validateField = (field: FieldName, state = form): string | null => {
    switch (field) {
      case "first_name":
        return validateName(state.first_name, "First name");
      case "last_name":
        return validateName(state.last_name, "Last name");
      case "email":
        return validateEmail(state.email);
      case "company_name":
        return validateCompany(state.company_name);
      case "phone_number": {
        // Required by the API, unlike the optional field on other forms.
        const digits = state.phone_number.replace(/\D/g, "");
        if (digits.length === 0) return "Phone number is required.";
        return validatePhone(digits, country);
      }
      case "industry":
        return state.industry.trim().length === 0
          ? "Please select an industry."
          : null;
      case "inquiry": {
        const text = state.inquiry.trim();
        if (text.length === 0) return "Please tell us what you need.";
        if (text.length < MIN_INQUIRY) {
          return `Please use at least ${MIN_INQUIRY} characters.`;
        }
        if (text.length > MAX_INQUIRY) {
          return `Please keep this under ${MAX_INQUIRY} characters.`;
        }
        return null;
      }
      default:
        return null;
    }
  };

  const validateAll = (state = form): FieldErrors => {
    const next: FieldErrors = {};
    (Object.keys(INITIAL) as FieldName[]).forEach((field) => {
      const message = validateField(field, state);
      if (message) next[field] = message;
    });
    return next;
  };

  const update =
    (field: FieldName) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = event.target.value;

      // Phone accepts digits only, capped at the selected country's length.
      if (field === "phone_number") {
        value = value.replace(/\D/g, "").slice(0, maxDigits);
      }

      const next = { ...form, [field]: value };
      setForm(next);

      // Only correct a field live once it has been blurred, so the message
      // appears after a first attempt rather than mid-typing.
      if (touched[field]) {
        setFieldErrors((prev) => ({
          ...prev,
          [field]: validateField(field, next) ?? undefined,
        }));
      }
    };

  const handleBlur = (field: FieldName) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldErrors((prev) => ({
      ...prev,
      [field]: validateField(field) ?? undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    // Surface every problem at once, and focus the first offending field.
    const errors = validateAll();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched(
        Object.fromEntries(
          (Object.keys(INITIAL) as FieldName[]).map((f) => [f, true]),
        ),
      );
      setError(null);

      const firstInvalid = (Object.keys(INITIAL) as FieldName[]).find(
        (field) => errors[field],
      );
      if (firstInvalid) document.getElementById(`cs-${firstInvalid}`)?.focus();
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;

    const payload: ContactSalesPayload = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      company_name: form.company_name.trim(),
      email: form.email.trim(),
      // The API takes one combined string including the dialling code.
      phone_no: `${country.dial}${phoneDigits}`,
      industry: form.industry.trim(),
      inquiry: form.inquiry.trim(),
    };

    try {
      await submitContactSales(payload, controller.signal);
      setSuccess(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(
        err instanceof InquiryError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      abortRef.current = null;
      setLoading(false);
    }
  };

  const fieldClass = (invalid?: boolean) =>
    cn(
      "w-full rounded-[14px] border bg-surface px-4 py-3 text-[0.9375rem] text-foreground outline-none transition-colors placeholder:text-muted disabled:opacity-60",
      invalid
        ? "border-[#d92d20] focus:border-[#d92d20] focus:ring-2 focus:ring-[#d92d20]/20"
        : "border-line focus:border-accent-line focus:ring-2 focus:ring-accent/25",
    );

  const labelClass =
    "mb-1.5 block text-[0.8125rem] font-medium text-foreground";

  return (
    <div
      // Lenis captures wheel events document-wide, so opt the overlay out or
      // a tall form cannot be scrolled on a short screen.
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-[rgb(var(--brand-purple-rgb)/0.35)] px-4 py-6 backdrop-blur-sm sm:items-center sm:py-10"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[880px] rounded-frame border border-line bg-surface p-6 shadow-float md:p-8"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand-soft hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        {success ? (
          <div className="py-8 text-center">
            <CheckCircle2
              className="mx-auto size-12 text-accent"
              aria-hidden="true"
            />
            <h2
              id={titleId}
              className="text-display mt-5 text-[clamp(1.5rem,2.4vw,1.875rem)]"
            >
              Thank you. We have your details.
            </h2>
            <p className="mx-auto mt-3 max-w-[26rem] text-[0.9375rem] leading-relaxed text-muted">
              We have sent a confirmation to your email. Our sales team will be
              in touch shortly to shape a plan around how your team works.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-brand shadow-brand mt-7 inline-flex h-12 items-center justify-center rounded-pill px-8 text-[0.9375rem] font-medium text-white transition-[filter,transform] duration-200 hover:-translate-y-px hover:brightness-[1.07]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2
              id={titleId}
              className="text-display pr-10 text-[clamp(1.5rem,2.4vw,1.875rem)]"
            >
              Talk to our sales team
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              Tell us how your team runs campaigns and we will put together a
              plan shaped to your volume.
            </p>

            <form onSubmit={handleSubmit} className="mt-5" noValidate>
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="cs-first_name">
                    First name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="cs-first_name"
                    name="first_name"
                    required
                    maxLength={100}
                    autoComplete="given-name"
                    disabled={loading}
                    value={form.first_name}
                    onChange={update("first_name")}
                    onBlur={handleBlur("first_name")}
                    aria-invalid={Boolean(fieldErrors.first_name)}
                    aria-describedby={
                      fieldErrors.first_name ? "cs-first_name-error" : undefined
                    }
                    className={fieldClass(Boolean(fieldErrors.first_name))}
                    placeholder="Jane"
                  />
                  <FieldError
                    id="cs-first_name-error"
                    message={fieldErrors.first_name}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="cs-last_name">
                    Last name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cs-last_name"
                    name="last_name"
                    required
                    maxLength={100}
                    autoComplete="family-name"
                    disabled={loading}
                    value={form.last_name}
                    onChange={update("last_name")}
                    onBlur={handleBlur("last_name")}
                    aria-invalid={Boolean(fieldErrors.last_name)}
                    aria-describedby={
                      fieldErrors.last_name ? "cs-last_name-error" : undefined
                    }
                    className={fieldClass(Boolean(fieldErrors.last_name))}
                    placeholder="Doe"
                  />
                  <FieldError
                    id="cs-last_name-error"
                    message={fieldErrors.last_name}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="cs-email">
                    Work email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cs-email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    autoComplete="email"
                    disabled={loading}
                    value={form.email}
                    onChange={update("email")}
                    onBlur={handleBlur("email")}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? "cs-email-error" : undefined
                    }
                    className={fieldClass(Boolean(fieldErrors.email))}
                    placeholder="jane@company.com"
                  />
                  <FieldError id="cs-email-error" message={fieldErrors.email} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="cs-company_name">
                    Company name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cs-company_name"
                    name="company_name"
                    required
                    maxLength={200}
                    autoComplete="organization"
                    disabled={loading}
                    value={form.company_name}
                    onChange={update("company_name")}
                    onBlur={handleBlur("company_name")}
                    aria-invalid={Boolean(fieldErrors.company_name)}
                    aria-describedby={
                      fieldErrors.company_name
                        ? "cs-company_name-error"
                        : undefined
                    }
                    className={fieldClass(Boolean(fieldErrors.company_name))}
                    placeholder="Acme Corp"
                  />
                  <FieldError
                    id="cs-company_name-error"
                    message={fieldErrors.company_name}
                  />
                </div>

                <div className="grid grid-cols-[minmax(0,136px)_1fr] gap-3">
                  <div>
                    <span className={labelClass} id="cs-country-code-label">
                      Code
                    </span>
                    <CountryCodeSelect
                      value={country}
                      onChange={(next) => {
                        setCountry(next);
                        // The expected length just changed, so re-check the
                        // number already entered against the new country.
                        const digits = form.phone_number.replace(/\D/g, "");
                        const trimmed = digits.slice(0, digitRange(next).max);
                        setForm((prev) => ({
                          ...prev,
                          phone_number: trimmed,
                        }));
                        setFieldErrors((prev) => ({
                          ...prev,
                          phone_number: touched.phone_number
                            ? (validatePhone(trimmed, next) ?? undefined)
                            : undefined,
                        }));
                      }}
                      disabled={loading}
                      labelledBy="cs-country-code-label"
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="cs-phone_number">
                      Phone number <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="cs-phone_number"
                      name="phone_number"
                      type="tel"
                      required
                      inputMode="numeric"
                      maxLength={maxDigits}
                      autoComplete="tel-national"
                      disabled={loading}
                      value={form.phone_number}
                      onChange={update("phone_number")}
                      onBlur={handleBlur("phone_number")}
                      aria-invalid={Boolean(fieldErrors.phone_number)}
                      aria-describedby={
                        fieldErrors.phone_number
                          ? "cs-phone_number-error"
                          : undefined
                      }
                      className={fieldClass(Boolean(fieldErrors.phone_number))}
                      placeholder={country.example}
                    />
                  </div>

                  <div className="col-span-2">
                    <FieldError
                      id="cs-phone_number-error"
                      message={fieldErrors.phone_number}
                    />
                    {!fieldErrors.phone_number && (
                      <p className="mt-1.5 text-[0.8125rem] text-muted">
                        {phoneDigits.length > 0
                          ? `${phoneDigits.length} of ${maxDigits} digits`
                          : `${maxDigits} digits for ${country.name}`}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <span className={labelClass} id="cs-industry-label">
                    Industry <span aria-hidden="true">*</span>
                  </span>
                  <SelectField
                    value={form.industry}
                    onChange={(industry) => {
                      setForm((prev) => ({ ...prev, industry }));
                      setTouched((prev) => ({ ...prev, industry: true }));
                      setFieldErrors((prev) => ({
                        ...prev,
                        industry: undefined,
                      }));
                    }}
                    options={INDUSTRIES}
                    placeholder="Select an industry"
                    disabled={loading}
                    labelledBy="cs-industry-label"
                  />
                  <FieldError
                    id="cs-industry-error"
                    message={fieldErrors.industry}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="cs-inquiry">
                    What do you need? <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="cs-inquiry"
                    name="inquiry"
                    rows={3}
                    required
                    maxLength={MAX_INQUIRY}
                    disabled={loading}
                    value={form.inquiry}
                    onChange={update("inquiry")}
                    onBlur={handleBlur("inquiry")}
                    aria-invalid={Boolean(fieldErrors.inquiry)}
                    aria-describedby={
                      fieldErrors.inquiry ? "cs-inquiry-error" : undefined
                    }
                    className={cn(
                      fieldClass(Boolean(fieldErrors.inquiry)),
                      "resize-y",
                    )}
                    placeholder="Channels you post to, volume per month, team size, any compliance needs."
                  />
                  <FieldError
                    id="cs-inquiry-error"
                    message={fieldErrors.inquiry}
                  />
                </div>
              </div>

              {error && (
                <p
                  id={errorId}
                  role="alert"
                  className="mt-4 rounded-[14px] border border-[#f5c2c2] bg-[#fdf1f1] px-4 py-3 text-[0.8125rem] leading-normal text-[#b42318]"
                >
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between">
                <p className="m-0 text-[0.75rem] text-muted">
                  We use your details only to respond to this inquiry.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  aria-describedby={error ? errorId : undefined}
                  className="bg-brand shadow-brand inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-pill px-8 text-[0.9375rem] font-medium text-white transition-[filter,transform] duration-200 hover:-translate-y-px hover:brightness-[1.07] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {loading && (
                    <Loader2
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {loading ? "Submitting" : "Submit inquiry"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
