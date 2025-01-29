import { useRef, useState } from "react";
import { IconType } from "react-icons";
import styles from "./input-with-icon.module.css";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { Controller, Control } from "react-hook-form";

interface InputProps {
  name: string;
  type: string;
  control: Control;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LeftIcon: IconType;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputProps> = ({
  LeftIcon,
  label,
  control,
  type,
  name,
  value,
  disabled,
  onChange,
  onFocus,
  onBlur,
}) => {
  const inputRef = useRef<HTMLElement | null>(null);
  const [showLabel, setShowLabel] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div
      className={`position-relative border rounded d-flex align-items-end px-2 gap-2 pb-2 pt-4 mb-3 ${
        showLabel && "border-danger"
      }`}
    >
      <LeftIcon className="text-danger fs-4" />
      <div
        className="w-100 tw-cursor-pointer"
        onClick={() => inputRef.current?.focus()}
      >
        <label
          className={`form-label form-text text-secondary position-absolute top-0  ${
            styles["transition-label"]
          } ${
            showLabel || inputValue.length > 0 ? styles["label-visible"] : ""
          }`}
        >
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <>
                <input
                  type={
                    type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  {...field}
                  ref={(element) => {
                    inputRef.current = element; // Assign input element to ref
                    field.ref(element); // Pass the ref to react-hook-form
                  }}
                  value={value ? value : field.value}
                  className="flex-grow-1 border-0 form-control shadow-none px-0 py-0 text-dark-75"
                  disabled={disabled}
                  placeholder={!showLabel ? label : ""}
                  onFocus={(event) => {
                    onFocus?.(event);
                    setShowLabel(true);
                  }}
                  onBlur={(event) => {
                    onBlur?.(event);
                    field.onBlur();
                    setShowLabel(false);
                  }}
                  onChange={(event) => {
                    onChange?.(event);
                    field.onChange(event);
                    setInputValue(event.target.value);
                  }}
                />
                {error ? (
                  <p className="form-text text-danger p-0 m-0">
                    {error.message}
                  </p>
                ) : null}
              </>
            );
          }}
        />
      </div>
      {type === "password" ? (
        showPassword ? (
          <MdVisibilityOff
            onClick={() => setShowPassword(false)}
            className="cursor-pointer text-danger tw-cursor-pointer fs-4"
          />
        ) : (
          <MdVisibility
            onClick={() => setShowPassword(true)}
            className="cursor-pointer text-danger tw-cursor-pointer fs-4"
          />
        )
      ) : null}
    </div>
  );
};

export default InputWithIcon;
