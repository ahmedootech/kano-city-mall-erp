"use client";
import Image from "next/image";

import { useState } from "react";

type LogoProps = {
  width?: number;
  height?: number;
};

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  const [logo, setLogo] = useState("/images/logo.png");

  return (
    <Image
      src={logo}
      width={width || 200}
      height={height || 32}
      alt="Logo image"
      className="tw-object-contain"
    />
  );
};
export default Logo;
