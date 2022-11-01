import React from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <>
      <MobileNav />
      <DesktopNav />
    </>
  );
};

export default Navbar;
