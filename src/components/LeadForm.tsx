import type { ChangeEvent, FormEvent } from "react";
import { useId, useState } from "react";

import type { Locale } from "@/src/types";

interface LeadFormProps {
  locale: Locale;
  urgent?: boolean;
  defaultServiceSlug?: string;
  variant?: "default" | "dark";
  attachmentsEnabled?: boolean;
}

interface LeadFormState {
  name: string;
  phone: string;
  email: string;
  task: string;
}

type LeadFormErrors = Partial<Record<keyof LeadFormState, string>>;
type LeadFormStatus = "idle" | "error" | "validated";

function createInitialState(): LeadFormState {
  return {
    name: "",
    phone: "",
    email: "",
    task: "",
  };
}

const leadFormCopy = {
  ru: {
    name: "Имя",
    phone: "Телефон",
    email: "Email",
    message: "Сообщение",
    namePlaceholder: "Ваше имя",
    phonePlaceholder: "+374",
    emailPlaceholder: "example@mail.com",
    messagePlaceholder: "Коротко опишите задачу, объект и что именно нужно сделать.",
    filesLabel: "Файлы по объекту",
    filesButton: "Прикрепить файлы",
    filesHint: "Фото, схемы, чертежи, сметы, PDF, Word, Excel, PNG, JPG/JPEG.",
    submit: "Отправить заявку",
    hint: "Можно сразу отправить запрос и файлы по задаче.",
    success: "Поля заполнены корректно. Следующим шагом сюда можно подключить реальную отправку заявки.",
    fixErrors: "Заполните имя, телефон, email и сообщение, чтобы отправить обращение.",
    invalidName: "Укажите имя.",
    invalidPhone: "Укажите телефон.",
    invalidEmail: "Укажите корректный email.",
    invalidTask: "Коротко опишите задачу.",
  },
  hy: {
    name: "Անուն",
    phone: "Հեռախոս",
    email: "Email",
    message: "Հաղորդագրություն",
    namePlaceholder: "Ձեր անունը",
    phonePlaceholder: "+374",
    emailPlaceholder: "example@mail.com",
    messagePlaceholder: "Կարճ նկարագրեք խնդիրը, օբյեկտը և ինչ պետք է անել։",
    filesLabel: "Օբյեկտի ֆայլեր",
    filesButton: "Կցել ֆայլեր",
    filesHint: "Լուսանկարներ, սխեմաներ, գծագրեր, նախահաշիվ, PDF, Word, Excel, PNG, JPG/JPEG։",
    submit: "Ուղարկել հայտը",
    hint: "Կարելի է անմիջապես ուղարկել հարցումը և առաջադրանքի ֆայլերը։",
    success: "Դաշտերը ճիշտ են լրացված։ Հաջորդ քայլով այստեղ կարելի է միացնել հայտի իրական ուղարկումը։",
    fixErrors: "Լրացրեք անունը, հեռախոսը, email-ը և հաղորդագրությունը, որպեսզի դիմումն ուղարկվի։",
    invalidName: "Նշեք անունը։",
    invalidPhone: "Նշեք հեռախոսահամարը։",
    invalidEmail: "Նշեք ճիշտ email։",
    invalidTask: "Կարճ նկարագրեք խնդիրը։",
  },
} as const;

function hasValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

function validateForm(locale: Locale, values: LeadFormState): LeadFormErrors {
  const errors: LeadFormErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");
  const copy = leadFormCopy[locale];

  if (values.name.trim().length < 2) {
    errors.name = copy.invalidName;
  }

  if (phoneDigits.length < 7) {
    errors.phone = copy.invalidPhone;
  }

  if (!hasValidEmail(values.email)) {
    errors.email = copy.invalidEmail;
  }

  if (values.task.trim().length < 10) {
    errors.task = copy.invalidTask;
  }

  return errors;
}

function sanitizePhoneInput(value: string) {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, 24);
}

export function LeadForm({
  locale,
  urgent: _urgent = false,
  defaultServiceSlug: _defaultServiceSlug,
  variant = "default",
  attachmentsEnabled = false,
}: LeadFormProps) {
  const formId = useId();
  const copy = leadFormCopy[locale];
  const [values, setValues] = useState<LeadFormState>(() => createInitialState());
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [attachmentNames, setAttachmentNames] = useState<string[]>([]);

  const note =
    status === "validated" ? copy.success : status === "error" ? copy.fixErrors : copy.hint;

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof LeadFormState;
    const value = field === "phone" ? sanitizePhoneInput(event.target.value) : event.target.value;

    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[field];
        return nextErrors;
      });
    }

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const handleAttachmentsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, 8);
    setAttachmentNames(files.map((file) => file.name));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(locale, values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("validated");
  };

  const fieldClassName = (field: keyof LeadFormState) => (errors[field] ? "is-invalid" : undefined);
  const fieldErrorId = (field: keyof LeadFormState) => `${formId}-${field}-error`;
  const fieldInputId = (field: keyof LeadFormState) => `${formId}-${field}`;
  const fieldDescribedBy = (field: keyof LeadFormState) => (errors[field] ? fieldErrorId(field) : undefined);
  const attachmentInputId = `${formId}-attachments`;

  return (
    <form className={`lead-form ${variant === "dark" ? "lead-form--dark" : ""}`.trim()} onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          <span>{copy.name}</span>
          <input
            id={fieldInputId("name")}
            type="text"
            name="name"
            value={values.name}
            onChange={handleFieldChange}
            placeholder={copy.namePlaceholder}
            className={fieldClassName("name")}
            autoComplete="name"
            minLength={2}
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={fieldDescribedBy("name")}
          />
          {errors.name ? (
            <span id={fieldErrorId("name")} className="form-error">
              {errors.name}
            </span>
          ) : null}
        </label>
        <label>
          <span>{copy.phone}</span>
          <input
            id={fieldInputId("phone")}
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleFieldChange}
            placeholder={copy.phonePlaceholder}
            className={fieldClassName("phone")}
            inputMode="tel"
            autoComplete="tel"
            maxLength={24}
            required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={fieldDescribedBy("phone")}
          />
          {errors.phone ? (
            <span id={fieldErrorId("phone")} className="form-error">
              {errors.phone}
            </span>
          ) : null}
        </label>
        <label>
          <span>{copy.email}</span>
          <input
            id={fieldInputId("email")}
            type="email"
            name="email"
            value={values.email}
            onChange={handleFieldChange}
            placeholder={copy.emailPlaceholder}
            className={fieldClassName("email")}
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={fieldDescribedBy("email")}
          />
          {errors.email ? (
            <span id={fieldErrorId("email")} className="form-error">
              {errors.email}
            </span>
          ) : null}
        </label>
        <label className="form-grid__wide">
          <span>{copy.message}</span>
          <textarea
            id={fieldInputId("task")}
            name="task"
            value={values.task}
            onChange={handleFieldChange}
            rows={5}
            className={fieldClassName("task")}
            minLength={10}
            maxLength={1000}
            required
            aria-invalid={errors.task ? true : undefined}
            aria-describedby={fieldDescribedBy("task")}
            placeholder={
              copy.messagePlaceholder
            }
          />
          {errors.task ? (
            <span id={fieldErrorId("task")} className="form-error">
              {errors.task}
            </span>
          ) : null}
        </label>
        {attachmentsEnabled ? (
          <label className="form-grid__wide form-upload" htmlFor={attachmentInputId}>
            <span>{copy.filesLabel}</span>
            <input
              id={attachmentInputId}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              className="form-upload__input"
              onChange={handleAttachmentsChange}
            />
            <span className="form-upload__control">
              <span className="form-upload__button">{copy.filesButton}</span>
              <span className="form-upload__hint">{copy.filesHint}</span>
            </span>
            {attachmentNames.length > 0 ? (
              <span className="form-upload__list" aria-live="polite">
                {attachmentNames.join(" · ")}
              </span>
            ) : null}
          </label>
        ) : null}
      </div>

      <div className="form-actions">
        <button type="submit" className="button button--primary">
          {copy.submit}
        </button>
        <p
          className={`form-note ${status === "validated" ? "form-note--success" : status === "error" ? "form-note--error" : ""}`.trim()}
          role="status"
          aria-live="polite"
        >
          {note}
        </p>
      </div>
    </form>
  );
}
