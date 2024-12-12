import { useState } from "react";
import { IconType } from "react-icons";

interface InputProps {
  name: string;
  type: string;
  label?: string;
  LeftIcon?: IconType | any;
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  LeftIcon,
  label,
  type,
  name,
  disabled,
  onChange,
  onFocus,
  onBlur,
}) => {
  const [showLabel, setShowLabel] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className={`position-relative border rounded d-flex align-items-end px-2 gap-2 pb-3 pt-4`}
    >
      {LeftIcon && <LeftIcon />}
      <div className=" w-100">
        <label
          className={`form-label form-text text-secondary position-absolute transition-label top-0 ${
            showLabel || inputValue.length > 0 ? "label-visible" : ""
          }`}
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="flex-grow-1 border-0 form-control shadow-none px-0 py-0"
          placeholder={!showLabel ? label : ""}
          onFocus={(event) => {
            onFocus?.(event);
            setShowLabel(true);
          }}
          onBlur={(event) => {
            onBlur?.(event);
            setShowLabel(false);
          }}
          onChange={(event) => {
            onChange?.(event);
            setInputValue(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Input;
