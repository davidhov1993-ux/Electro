import type { ChangeEvent, FormEvent } from "react";
import { useId, useState } from "react";

import type { Locale } from "@/src/types";

interface QuickLeadFormProps {
  locale: Locale;
}

interface QuickLeadFormState {
  name: string;
  phone: string;
  address: string;
  task: string;
  preferredTime: string;
}

type QuickLeadFormErrors = Partial<Record<keyof QuickLeadFormState, string>>;
type QuickLeadFormStatus = "idle" | "error" | "validated";

const quickCopy = {
  name: { ru: "Ваше имя", hy: "Ваше имя" },
  phone: { ru: "Телефон", hy: "Телефон" },
  address: { ru: "Район / адрес объекта", hy: "Район / адрес объекта" },
  task: { ru: "Что нужно сделать", hy: "Что нужно сделать" },
  preferredTime: { ru: "Удобное время для связи", hy: "Удобное время для связи" },
  send: { ru: "Отправить заявку", hy: "Отправить заявку" },
  hint: {
    ru: "Опишите задачу как можно точнее. Это поможет быстрее понять объём работ и предложить решение.",
    hy: "Опишите задачу как можно точнее. Это поможет быстрее понять объём работ и предложить решение.",
  },
  success: {
    ru: "Форма заполнена корректно. Следующим шагом сюда можно подключить реальную отправку заявки.",
    hy: "Форма заполнена корректно. Следующим шагом сюда можно подключить реальную отправку заявки.",
  },
  fixErrors: {
    ru: "Проверьте обязательные поля формы.",
    hy: "Проверьте обязательные поля формы.",
  },
  invalidName: {
    ru: "Укажите имя.",
    hy: "Укажите имя.",
  },
  invalidPhone: {
    ru: "Укажите телефон.",
    hy: "Укажите телефон.",
  },
  invalidTask: {
    ru: "Коротко опишите задачу.",
    hy: "Коротко опишите задачу.",
  },
} as const;

function qt(locale: Locale, key: keyof typeof quickCopy) {
  return quickCopy[key][locale];
}

function sanitizePhoneInput(value: string) {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, 24);
}

function validate(locale: Locale, values: QuickLeadFormState): QuickLeadFormErrors {
  const errors: QuickLeadFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = qt(locale, "invalidName");
  }

  if (values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = qt(locale, "invalidPhone");
  }

  if (values.task.trim().length < 10) {
    errors.task = qt(locale, "invalidTask");
  }

  return errors;
}

export function QuickLeadForm({ locale }: QuickLeadFormProps) {
  const formId = useId();
  const [values, setValues] = useState<QuickLeadFormState>({
    name: "",
    phone: "",
    address: "",
    task: "",
    preferredTime: "",
  });
  const [errors, setErrors] = useState<QuickLeadFormErrors>({});
  const [status, setStatus] = useState<QuickLeadFormStatus>("idle");

  const note =
    status === "validated"
      ? qt(locale, "success")
      : status === "error"
        ? qt(locale, "fixErrors")
        : qt(locale, "hint");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof QuickLeadFormState;
    const value = field === "phone" ? sanitizePhoneInput(event.target.value) : event.target.value;

    setValues((current) => ({ ...current, [field]: value }));

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
    const nextErrors = validate(locale, values);
    setErrors(nextErrors);
    setStatus(Object.keys(nextErrors).length > 0 ? "error" : "validated");
  };

  const errorId = (field: keyof QuickLeadFormState) => `${formId}-${field}-error`;
  const describedBy = (field: keyof QuickLeadFormState) => (errors[field] ? errorId(field) : undefined);

  return (
    <form className="lead-form quick-lead-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          <span>{qt(locale, "name")}</span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder={qt(locale, "name")}
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
          />
          {errors.name ? <span id={errorId("name")} className="form-error">{errors.name}</span> : null}
        </label>

        <label>
          <span>{qt(locale, "phone")}</span>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="+374"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
          />
          {errors.phone ? <span id={errorId("phone")} className="form-error">{errors.phone}</span> : null}
        </label>

        <label>
          <span>{qt(locale, "address")}</span>
          <input
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
            placeholder={qt(locale, "address")}
          />
        </label>

        <label>
          <span>{qt(locale, "preferredTime")}</span>
          <input
            type="text"
            name="preferredTime"
            value={values.preferredTime}
            onChange={handleChange}
            placeholder={qt(locale, "preferredTime")}
          />
        </label>

        <label className="form-grid__wide">
          <span>{qt(locale, "task")}</span>
          <textarea
            name="task"
            value={values.task}
            onChange={handleChange}
            rows={5}
            placeholder={qt(locale, "task")}
            required
            aria-invalid={errors.task ? true : undefined}
            aria-describedby={describedBy("task")}
          />
          {errors.task ? <span id={errorId("task")} className="form-error">{errors.task}</span> : null}
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button--primary">
          {qt(locale, "send")}
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
