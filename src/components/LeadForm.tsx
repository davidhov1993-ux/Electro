import type { ChangeEvent, FormEvent } from "react";
import { useId, useState } from "react";

import { isServiceSlug, services, t, uiCopy } from "@/src/content/site";
import type { Locale, ServiceSlug } from "@/src/types";

interface LeadFormProps {
  locale: Locale;
  urgent?: boolean;
  defaultServiceSlug?: string;
}

type ObjectTypeValue = "" | "apartment" | "house" | "office" | "commercial";
type ServiceValue = "" | ServiceSlug;
type UrgencyValue = "normal" | "urgent";

interface LeadFormState {
  name: string;
  phone: string;
  objectType: ObjectTypeValue;
  service: ServiceValue;
  task: string;
  urgency: UrgencyValue;
}

type LeadFormErrors = Partial<Record<keyof LeadFormState, string>>;
type LeadFormStatus = "idle" | "error" | "validated";

const emergencyServiceSlug: ServiceSlug = "avariinyi-elektrik";

function createInitialState(defaultServiceSlug?: string, urgent = false): LeadFormState {
  const normalizedServiceSlug = defaultServiceSlug && isServiceSlug(defaultServiceSlug) ? defaultServiceSlug : "";

  return {
    name: "",
    phone: "",
    objectType: "",
    service: normalizedServiceSlug || (urgent ? emergencyServiceSlug : ""),
    task: "",
    urgency: urgent ? "urgent" : "normal",
  };
}

function validateForm(locale: Locale, values: LeadFormState): LeadFormErrors {
  const errors: LeadFormErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (values.name.trim().length < 2) {
    errors.name = t(locale, uiCopy.invalidName);
  }

  if (phoneDigits.length < 7) {
    errors.phone = t(locale, uiCopy.invalidPhone);
  }

  if (!values.objectType) {
    errors.objectType = t(locale, uiCopy.invalidObjectType);
  }

  if (!values.service || !isServiceSlug(values.service)) {
    errors.service = t(locale, uiCopy.invalidService);
  }

  if (values.task.trim().length < 10) {
    errors.task = t(locale, uiCopy.invalidTask);
  }

  return errors;
}

function sanitizePhoneInput(value: string) {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, 24);
}

export function LeadForm({ locale, urgent = false, defaultServiceSlug }: LeadFormProps) {
  const formId = useId();
  const [values, setValues] = useState<LeadFormState>(() => createInitialState(defaultServiceSlug, urgent));
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>("idle");

  const note =
    status === "validated"
      ? t(locale, uiCopy.formSuccess)
      : status === "error"
        ? t(locale, uiCopy.fixErrors)
        : t(locale, uiCopy.formHint);

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

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          <span>{t(locale, uiCopy.name)}</span>
          <input
            id={fieldInputId("name")}
            type="text"
            name="name"
            value={values.name}
            onChange={handleFieldChange}
            placeholder={locale === "ru" ? "Ваше имя" : "Ձեր անունը"}
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
          <span>{t(locale, uiCopy.phone)}</span>
          <input
            id={fieldInputId("phone")}
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleFieldChange}
            placeholder="+374"
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
          <span>{t(locale, uiCopy.objectType)}</span>
          <select
            id={fieldInputId("objectType")}
            name="objectType"
            value={values.objectType}
            onChange={handleFieldChange}
            className={fieldClassName("objectType")}
            required
            aria-invalid={errors.objectType ? true : undefined}
            aria-describedby={fieldDescribedBy("objectType")}
          >
            <option value="" disabled>
              {locale === "ru" ? "Выберите объект" : "Ընտրեք օբյեկտը"}
            </option>
            <option value="apartment">{locale === "ru" ? "Квартира" : "Բնակարան"}</option>
            <option value="house">{locale === "ru" ? "Дом" : "Տուն"}</option>
            <option value="office">{locale === "ru" ? "Офис" : "Գրասենյակ"}</option>
            <option value="commercial">{locale === "ru" ? "Коммерческий объект" : "Կոմերցիոն օբյեկտ"}</option>
          </select>
          {errors.objectType ? (
            <span id={fieldErrorId("objectType")} className="form-error">
              {errors.objectType}
            </span>
          ) : null}
        </label>
        <label>
          <span>{t(locale, uiCopy.service)}</span>
          <select
            id={fieldInputId("service")}
            name="service"
            value={values.service}
            onChange={handleFieldChange}
            className={fieldClassName("service")}
            required
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={fieldDescribedBy("service")}
          >
            <option value="" disabled>
              {locale === "ru" ? "Выберите направление" : "Ընտրեք ուղղությունը"}
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {t(locale, service.title)}
              </option>
            ))}
          </select>
          {errors.service ? (
            <span id={fieldErrorId("service")} className="form-error">
              {errors.service}
            </span>
          ) : null}
        </label>
        <label className="form-grid__wide">
          <span>{t(locale, uiCopy.task)}</span>
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
              locale === "ru"
                ? "Опишите объект, симптомы или то, что нужно реализовать."
                : "Նկարագրեք օբյեկտը, ախտանիշները կամ այն, ինչ պետք է իրականացնել։"
            }
          />
          {errors.task ? (
            <span id={fieldErrorId("task")} className="form-error">
              {errors.task}
            </span>
          ) : null}
        </label>
        <label>
          <span>{t(locale, uiCopy.urgency)}</span>
          <select id={fieldInputId("urgency")} name="urgency" value={values.urgency} onChange={handleFieldChange}>
            <option value="normal">{t(locale, uiCopy.normal)}</option>
            <option value="urgent">{t(locale, uiCopy.urgent)}</option>
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button--primary">
          {t(locale, uiCopy.send)}
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
