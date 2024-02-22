import React from "react";
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

function SigninComponent() {
  const { handleLogin } = useAuthContext();
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 gap-5">
      <img src="./images/DriveriA.png" alt="logo" width={350} />

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Sign In</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            required
          />
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <span className="text-gray-600">
                Don't have an account?
                <Link to="/signup">
                  <button className="text-blue-500">Sign Up</button>
                </Link>
              </span>
        </div>
      </form>
    </div>
  );
}

export default SigninComponent;
