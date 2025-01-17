"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
  activeClassName?: string;
}

const ActiveLink = ({ href, children, ...props }: ActiveLinkProps) => {
  const pathname = usePathname();

  // Check if the current path is the same as the link's href
  const isActive =
    href === "/" ? pathname === href : pathname.startsWith(href as string);
  // const isActive = pathname.startsWith(href as string);
  //  const isActive = pathname === href;

  return (
    <Link
      href={href}
      {...props}
      className={`nav-link d-flex align-items-center gap-1
         p-2 rounded-end-1 ${
           isActive ? "tw-bg-yellow-500 fw-semibold " : "tw-text-gray-500"
         }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
