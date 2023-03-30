import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import React from "react";

const Logo = () => {
  const router: NextRouter = useRouter();

  return (
    <Image
      src="/assets/logo.png"
      alt="Logo"
      width={150}
      height={100}
      className="cursor-pointer"
      onClick={() => {
        router.push(`/`);
      }}
    />
  );
};

export default Logo;
