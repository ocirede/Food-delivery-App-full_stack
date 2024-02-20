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
          <div className="flex items-center w-1/6 ">
            <Search className="mr-2" />
            <input
              type="text"
              placeholder="Search in Berlinvery"
              className="border border-zinc-950 h-9 rounded-xl px-4"
            />
          </div>
          <DropMenu />
        </ul>
      </nav>
      <hr className=" border-zinc-950" />
    </>
  );
}

export default NavBar;
