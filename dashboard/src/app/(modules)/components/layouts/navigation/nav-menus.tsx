"use client";
import ActiveLink from "./active-link";
import { CiSettings } from "react-icons/ci";

import { LuHouse } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { PiChartDonutLight } from "react-icons/pi";
import { LuSquareActivity } from "react-icons/lu";
import { PiBuildingApartment } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiGroupLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { slugify } from "@/utils";
import { navigation } from "./data";
import LogoutButton from "../../logout-button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Mapping icons to their keys
const iconMap: Record<string, React.ComponentType> = {
  Dashboard: MdDashboard,
  Configuration: IoSettingsOutline,
  User: RiGroupLine,
  Department: PiBuildingApartment,
};

const NavMenus = () => {
  const modules = useSelector(
    (state: RootState) => state.auth.main.user?.modules
  );
  return (
    <div className="d-flex flex-column h-100 pb-3">
      <div className="flex-grow-1">
        <div className="ms-2 d-flex flex-column">
          <ActiveLink href={`/dashboard`}>
            <MdDashboard />
            Dashboard
          </ActiveLink>
          {Object.keys(modules!).map((module, i) => {
            const Icon = iconMap[module] || MdDashboard;
            return (
              <ActiveLink key={i} href={`/${slugify(module)}`}>
                <Icon />
                {module}
              </ActiveLink>
            );
          })}
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default NavMenus;
