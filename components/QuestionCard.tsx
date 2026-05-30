"use client";

import type { SurveyQuestion } from "@/types/survey";

type Props = {
  question: SurveyQuestion;
  value: string | string[];
  onChange: (id: SurveyQuestion["id"], value: string | string[]) => void;
};

export default function QuestionCard({ question, value, onChange }: Props) {
  const isMulti = question.type === "multi";
  const values = Array.isArray(value) ? value : [];

  function toggle(optionValue: string) {
    if (!isMulti) {
      onChange(question.id, optionValue);
      return;
    }

    if (values.includes(optionValue)) {
      onChange(
        question.id,
        values.filter((item) => item !== optionValue),
      );
      return;
    }

    onChange(question.id, [...values, optionValue]);
  }

  function checked(optionValue: string) {
    return isMulti ? values.includes(optionValue) : value === optionValue;
  }

  return (
    <fieldset className="rounded-lg border border-line bg-white p-4 transition focus-within:shadow-soft md:p-5">
      <legend className="mb-3 w-full text-lg font-black">{question.title}</legend>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {question.options.map((option) => (
          <label
            key={option.value}
            className={`relative flex min-h-[52px] cursor-pointer items-center rounded-lg border p-3 transition active:scale-[0.99] ${
              checked(option.value)
                ? "border-ink bg-white shadow-[inset_0_0_0_1px_#101114]"
                : "border-line bg-soft hover:-translate-y-0.5"
            }`}
          >
            <input
              checked={checked(option.value)}
              className="sr-only"
              name={String(question.id)}
              required={question.required && !isMulti}
              type={isMulti ? "checkbox" : "radio"}
              value={option.value}
              onChange={() => toggle(option.value)}
            />
            <span
              className={`mr-3 h-[18px] w-[18px] shrink-0 border border-[#aab0ba] bg-white ${
                isMulti ? "rounded" : "rounded-full"
              } ${checked(option.value) ? "border-ink bg-ink shadow-[inset_0_0_0_4px_white]" : ""}`}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
