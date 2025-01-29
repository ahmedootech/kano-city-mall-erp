import Logo from "@/app/components/logo";
import NavMenus from "./nav-menus";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { uiActions } from "@/store/features/ui";
import { MdClose } from "react-icons/md";
import { Offcanvas } from "react-bootstrap";

const Menus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ui = useSelector((state: RootState) => state.ui);
  const handleClose = () => {
    dispatch(uiActions.navigation.setShowSideBar(!ui.navigation.showSideBar));
  };
  return (
    <div
      className={`tw-h-full ${
        ui.navigation.showSideBar ? "tw-h-full" : "lg:tw-min-h-screen "
      } flex-column d-flex w-100`}
    >
      <div className="d-flex d-lg-none justify-content-end">
        <MdClose onClick={handleClose} />
      </div>
      <div className="px-3 py-2 tw-h-[48px] border-bottom d-flex align-items-center justify-content-center">
        <Logo width={104} height={38} />
      </div>

      <div className="tw-mt-[20px] px-1 px-lg-3 flex-grow-1 d-flex flex-column">
        <NavMenus />
      </div>
    </div>
  );
};

const SideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ui = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(uiActions.navigation.setShowSideBar(!ui.navigation.showSideBar));
  };

  return (
    <>
      <aside
        className="min-vh-100 flex-column d-none d-lg-block bg-dark text-white "
        style={{ width: "250px" }}
      >
        <div className="h-100">
          <Menus />
        </div>
        {/* <div className="px-3 py-2 tw-h-[48px] border-bottom d-flex align-items-center justify-content-center">
          <Logo width={104} height={38} />
        </div>

        <div className="tw-mt-[20px] px-3 flex-grow-1">
          <NavMenus />
        </div> */}
      </aside>
      <Offcanvas show={ui.navigation.showSideBar} onHide={handleClose}>
        <Offcanvas.Body className="bg-dark text-white">
          <Menus />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default SideBar;
