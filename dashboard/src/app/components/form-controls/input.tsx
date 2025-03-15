
import React from "react";
import { Controller, Control } from "react-hook-form";

interface CustomInputProps {
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  required?: boolean;
  control: Control;
  disabled?: boolean;
  value?: string;
  list?: string;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  type,
  name,
  disabled,
  control,
  value,
  list,
  rows = 3,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="py-1">
      {label && (
        <label
          htmlFor=""
          className="form-label fw-semibold mb-0"
          style={{ fontSize: "16px" }}
        >
          {label}:
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {type === "textarea" ? (
              <textarea
                className="form-control form-control-sm py-2 px-2 shadow-none"
                placeholder={placeholder ? placeholder : label}
                rows={rows}
                {...field}
                value={value ? value : field.value}
                disabled={disabled}
                onChange={(event) => {
                  field.onChange(event);
                  if (onChange) {
                    onChange(event as any);
                  }
                }}
                onFocus={(event) => {
                  if (onFocus) {
                    onFocus(event as any);
                  }
                }}
                onBlur={(event) => {
                  field.onBlur();
                  if (onBlur) {
                    onBlur(event as any);
                  }
                }}
              />
            ) : (
              <input
                type={type}
                className="form-control form-control-sm py-2 px-2 shadow-none"
                placeholder={placeholder ? placeholder : label}
                list={list}
                {...field}
                value={value ? value : field.value}
                disabled={disabled}
                onChange={(event) => {
                  field.onChange(event);
                  if (onChange) {
                    onChange(event);
                  }
                }}
                onFocus={(event) => {
                  if (onFocus) {
                    onFocus(event);
                  }
                }}
                onBlur={(event) => {
                  field.onBlur();
                  if (onBlur) {
                    onBlur(event);
                  }
                }}
              />
            )}
            {error ? (
              <p className="form-text text-danger p-0 m-0">{error.message}</p>
            ) : null}
          </>
        )}
      />
    </div>
  );
};

export default CustomInput;