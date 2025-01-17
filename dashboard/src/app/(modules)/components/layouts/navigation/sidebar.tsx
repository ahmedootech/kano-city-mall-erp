import Logo from "@/app/components/logo";
import NavMenus from "./nav-menus";

const SideBar = () => {
  return (
    <aside
      className="min-vh-100 flex-column d-none d-lg-flex bg-dark text-white "
      style={{ width: "250px" }}
    >
      <div className="px-3 py-2 tw-h-[48px] border-bottom d-flex align-items-center justify-content-center">
        <Logo width={104} height={38} />
      </div>

      <div className="tw-mt-[20px] px-3 flex-grow-1">
        <NavMenus />
      </div>
    </aside>
  );
};
export default SideBar;
