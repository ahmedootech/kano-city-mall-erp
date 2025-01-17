import { slugify } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconType } from "react-icons";
import { MdDashboard } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

type DropdownType = {
  label: string;
  path?: string;
  submenus: string[];
  Icon: IconType;
};

const Dropdown: React.FC<DropdownType> = ({
  label,
  submenus,
  Icon = MdDashboard,
  path,
}) => {
  const pathname = usePathname();
  const [showSubmenu, setShowSubmenu] = useState(false);

  // Check if the current path is the same as the link's href
  const isActive =
    label === "/" ? pathname === label : pathname.startsWith(label as string);
  return (
    <div className="p-2 cursor-pointer">
      <Link
        href={"#"}
        className={`d-flex align-items-center gap-1 nav-link ${
          isActive ? "tw-bg-gray-100 fw-semibold " : "tw-text-gray-500"
        }`}
        onClick={() => setShowSubmenu(!showSubmenu)}
      >
        <Icon />
        <span className="flex-grow-1">{label}</span>
        {submenus.length && (
          <>{showSubmenu ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</>
        )}
      </Link>
      {submenus.length && showSubmenu && (
        <div className="ms-4 mt-2 tw-text-sm tw-bg-gray-700">
          {submenus.map((submenu, i) => (
            <Link
              className="d-block tw-text-inherit tw-no-underline p-2 text-wrap tw-border-yellow-400 hover:tw-border-b-2"
              href={`/${slugify(label)}/${slugify(submenu)}`}
              key={i}
            >
              {submenu}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
