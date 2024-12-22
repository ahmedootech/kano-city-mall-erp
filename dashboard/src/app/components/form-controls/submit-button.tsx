import CircularProgress from "@mui/material/CircularProgress";
import React, { ReactNode } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const SubmitButton: React.FC<{
  title: string | ReactNode;
  loading?: boolean;
  action?: "confirm" | "back" | "forward";
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
}> = ({ title, loading, action, className, type, onClick }) => {
  let buttonLabel = title;

  switch (action) {
    case "confirm":
      buttonLabel = (
        <>
          <IoCheckmarkSharp size={20} /> {title}
        </>
      );
      break;
    case "forward":
      buttonLabel = (
        <>
          {title} <MdArrowForwardIos size={18} />
        </>
      );
      break;
    case "back":
      buttonLabel = (
        <>
          <MdArrowBackIos size={18} /> {title}
        </>
      );
      break;
    default:
      buttonLabel = title;
  }
  return (
    <button
      className={`btn btn-primary  rounded-3 px-5 py-2 fs-6 d-flex align-items-center justify-content-center gap-2 fw-bold ${className}`}
      disabled={loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <>
          <CircularProgress size={18} className="text-white" /> {title}
        </>
      ) : (
        buttonLabel
      )}
    </button>
  );
};
export default SubmitButton;
