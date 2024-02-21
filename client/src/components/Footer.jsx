import React from "react";
import { Copyright } from "lucide-react";

function Footer() {
  return (
    <>
      <div className=" flex items-center justify-center fixed bottom-0 w-full h-20 bg-neutral-100 gap-6">
        Federico & Kostas Corporation <Copyright />
        2024{" "}
      </div>
    </>
  );
}

export default Footer;
