import { AppDispatch } from "@/store";
import { authActions } from "@/store/features/auth";
import { clearAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const logoutHandler = () => {
    clearAuthToken();
    dispatch(authActions.main.logoutUser());
    setTimeout(() => {
      router.push("/auth/login");
    }, 100);
  };

  return (
    <button
      className="btn d-flex text-light align-items-center gap-1 px-0 fw-semibold"
      onClick={logoutHandler}
    >
      <CiLogin size="18" /> Logout
    </button>
  );
};

export default LogoutButton;
