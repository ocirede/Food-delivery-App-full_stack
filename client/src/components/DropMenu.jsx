import { ChevronDown, CircleUserRound } from "lucide-react";
import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";

function DropMenu() {
  const {
    user,
    firstnameUppercase,
    lastnameUppercase,
    handeLogout,
  } = useAuthContext();
  const [isClicked, setIsClicked] = useState(false);
  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="w-1/3 flex justify-center z-20">
      <div className="rounded-xl p-1 flex items-center gap-1 relative shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <CircleUserRound className="w-8 h-8" />
        Welcome{" "}

          <span className="text-gray-800 flex items-center">
            {user?.address ? (
              <p>
                {firstnameUppercase} 
              </p>
            ) : (
              <p>{user?.username}</p>
            )}
            <button onClick={() => handleToggle()} className="focus:outline-none">
              <ChevronDown />
            </button>
            {isClicked && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-md rounded-md w-60">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="profile"
                    className="flex gap-1 px-4 py-2 text-gray-800 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Profile:{" "}
                    {user?.address ? (
                      <>
                        {firstnameUppercase} {lastnameUppercase}
                      </>
                    ) : (
                      <>{user?.username}</>
                    )}
                  </a>

                  <hr className="border-zinc-300" />
                  <a
                    href="signin"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    role="menuitem"
                    onClick={handeLogout}
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </span>
        
      </div>
    </div>
  );
}

export default DropMenu;
