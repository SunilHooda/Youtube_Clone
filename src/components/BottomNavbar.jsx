import React from "react";
import { AiOutlineLinkedin } from "react-icons/ai";
import { MdHomeFilled } from "react-icons/md";
import { BsGlobe2 } from "react-icons/bs";

const BottomNavbar = () => {
  return (
    <div className="w-full flex md:hidden justify-evenly items-center gap-5 px-5 h-12 bg-[#212121] absolute left-0 bottom-0 z-10 opacity-95">
      <a href="https://www.linkedin.com/in/sunilhooda/">
        <AiOutlineLinkedin className="text-xl" />
      </a>

      <a href="/">
        <MdHomeFilled className="text-xl" />
      </a>

      <a href="https://sunilhooda.github.io/">
        <BsGlobe2 className="text-xl" />
      </a>
    </div>
  );
};

export default BottomNavbar;
