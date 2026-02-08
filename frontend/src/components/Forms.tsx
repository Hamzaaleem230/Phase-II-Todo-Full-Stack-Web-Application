// frontend/components/Forms.tsx
import React from 'react';

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
  type = 'text',
  id,
  value,
  onChange,
  required = false,
  disabled = false,
  textarea = false,
  rows = 4,
}) => {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '5px' }}>
        {label}:
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={rows}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      )}
    </div>
  );
};

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
  primary?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  primary = false,
}) => {
  const backgroundColor = primary ? '#0070f3' : '#6c757d';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 15px',
        backgroundColor: backgroundColor,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
};
