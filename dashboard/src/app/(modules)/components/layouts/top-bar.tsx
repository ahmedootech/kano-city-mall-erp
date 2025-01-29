"use client";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { BsBellFill } from "react-icons/bs";
import Image from "next/image";
import { LuSearch } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { uiActions } from "@/store/features/ui";
const TopBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth.main);
  const ui = useSelector((state: RootState) => state.ui);
  return (
    <>
      <section className="px-3 py-2 tw-h-[48px] bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <FiMenu
            size={28}
            className="text-dark d-lg-none"
            onClick={() =>
              dispatch(
                uiActions.navigation.setShowSideBar(!ui.navigation.showSideBar)
              )
            }
          />
          <div className="flex-grow-1 d-flex justify-content-center">
            <div className="d-flex align-items-center bg-light px-2 border rounded-5 tw-w-[200px]">
              <LuSearch size={18} />
              <input
                type="search"
                className="form-control bg-light flex-grow-1 border-0 outline-none shadow-none tw-text-sm"
                placeholder="Search anything"
              />
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <BsBellFill size={20} />
              <span className="tw-h-[13px] tw-w-[13px] tw-rounded-full tw-bg-red-500 position-absolute tw-bottom-3.5 tw-text-xs tw-grid tw-place-items-center tw-text-white">
                1
              </span>
            </div>
            <span className="text-dark fw-semibold">{auth.user?.role}</span>
            <div className="d-flex align-items-center gap-1">
              <div className="tw-w-[28px] tw-h-[28px] tw-bg-gray-300 tw-rounded-full position-relative">
                <Image src={"/images/avatar.png"} alt="" fill />
              </div>
              <IoIosArrowDown size={20} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopBar;
