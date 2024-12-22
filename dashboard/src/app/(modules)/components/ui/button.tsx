import { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset";
  Icon?: IconType;
  className?: string;
};
const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  Icon,
  className,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-primary d-flex align-items-center fw-semibold gap-2 ${className}`}
    >
      {Icon && <Icon />} {label}
    </button>
  );
};

export default Button;
