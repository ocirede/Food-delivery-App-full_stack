import { ChevronDown, CircleUserRound } from "lucide-react";
import React from "react";
import { useAuthContext } from "../context/authContext";

function DropMenu() {
  const { handleToggle, user, firstnameUppercase, lastnameUppercase, isClicked, handeLogout } = useAuthContext();

  return (
    <div className="w-1/3 flex justify-center ">
      <div className="rounded-xl  p-1 flex items-center gap-3 relative shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <CircleUserRound className="w-8 h-8" />
        Welcome
        {user && (
          <span className="text-gray-800 flex items-center">
            {firstnameUppercase}
            <button onClick={handleToggle} className="focus:outline-none">
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
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Profile: {firstnameUppercase} {lastnameUppercase}
                  </a>
                  <hr className=" border-zinc-300"/>
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
        )}
      </div>
    </div>
  );
}

export default DropMenu;

// return (
//   <div className="relative inline-block text-left">
//     <button
//       onClick={toggleDropdown}
//       className="bg-green-600 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
//     >
//       Menu
//       <svg
//         className="w-4 h-4 ml-2"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path
//           fillRule="evenodd"
//           d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </button>
//     {isOpen && (
//       <div className=" z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//         <div
//           className="py-1"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="options-menu"
//         >
//           <a
//             href="profile"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//             role="menuitem"
//           >
//             Profile
//           </a>

//           <a href="orders"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//             role="menuitem">Place orders</a>
//         </div>
//       </div>
//     )}
//   </div>
// );
