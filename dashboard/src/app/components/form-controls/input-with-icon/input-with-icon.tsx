import { useState } from "react";
import { IconType } from "react-icons";
import styles from "./input-with-icon.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputProps {
  name: string;
  type: string;
  LeftIcon: IconType | any;
  label: string;
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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div
      className={`position-relative border rounded d-flex align-items-end px-2 gap-2 pb-3 pt-4 mb-2 ${
        showLabel && "border-danger"
      }`}
    >
      <LeftIcon className="text-danger" />
      <div className=" w-100">
        <label
          className={`form-label form-text text-secondary position-absolute top-0  ${
            styles["transition-label"]
          } ${
            showLabel || inputValue.length > 0 ? styles["label-visible"] : ""
          }`}
        >
          {label}
        </label>
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          className="flex-grow-1 border-0 form-control shadow-none px-0 py-0 text-dark-75"
          disabled={disabled}
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
      {type === "password" ? (
        showPassword ? (
          <VisibilityOff
            onClick={() => setShowPassword(false)}
            className="cursor-pointer text-danger"
          />
        ) : (
          <Visibility
            onClick={() => setShowPassword(true)}
            className="cursor-pointer text-danger"
          />
        )
      ) : null}
    </div>
  );
};

export default Input;
