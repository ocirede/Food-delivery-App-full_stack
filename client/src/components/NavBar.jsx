import React from "react";
import { Search, LogOut } from "lucide-react";
import DropMenu from "./DropMenu";
import Home from "./Home";
function NavBar() {
  return (
    <>
      <nav className=" w-full h-28 flex items-center">
        <ul className=" w-full flex items-center justify-between gap-10 ">
          <Home />
          
          <DropMenu />
        </ul>
      </nav>
      <hr className=" border-zinc-950" />
    </>
  );
}

export default NavBar;
