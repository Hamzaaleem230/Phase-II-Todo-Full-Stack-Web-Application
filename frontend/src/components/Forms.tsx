// frontend/components/Forms.tsx
import React from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  id,
  value,
  onChange,
  required = false,
  disabled = false,
  textarea = false,
  rows = 4,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block mb-1 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={rows}
          className="
            w-full
            px-3 sm:px-4
            py-2 sm:py-2.5
            text-sm sm:text-base
            rounded-lg
            border border-gray-300
            dark:border-gray-700
            bg-white dark:bg-zinc-900
            text-gray-900 dark:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            disabled:opacity-60
          "
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="
            w-full
            px-3 sm:px-4
            py-2 sm:py-2.5
            text-sm sm:text-base
            rounded-lg
            border border-gray-300
            dark:border-gray-700
            bg-white dark:bg-zinc-900
            text-gray-900 dark:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            disabled:opacity-60
          "
        />
      )}
    </div>
  );
};

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  primary?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  primary = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        sm:w-auto
        px-4 sm:px-5
        py-2.5 sm:py-3
        text-sm sm:text-base
        rounded-lg
        font-semibold
        transition
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${
          primary
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-600 hover:bg-gray-700 text-white"
        }
      `}
    >
      {children}
    </button>
  );
};
