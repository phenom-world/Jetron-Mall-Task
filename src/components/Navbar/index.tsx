import { NextRouter, useRouter } from "next/router";
import React from "react";
import { FaPlus } from "react-icons/fa";
import Logo from "../Logo";

const Navbar = () => {
  const router: NextRouter = useRouter();
  const { create } = router.query;
  return (
    <div className="flex items-center justify-between border-b border-[#8b7e7e] p-4">
      <Logo />
      {!create && (
        <button
          className="rounded bg-button px-4 py-2 text-white outline-none hover:bg-[#6f7a8b]"
          onClick={() => {
            router.push({
              pathname: `/`,
              query: { create: true },
            });
          }}
        >
          <FaPlus className="mr-1 inline-block" /> Create Product
        </button>
      )}
    </div>
  );
};

export default Navbar;
