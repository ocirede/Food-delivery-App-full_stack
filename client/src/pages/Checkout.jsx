import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/restaurantContext";
import { useAuthContext } from "../context/authContext";

function Checkout() {
  const { userAddedOrders, restaurant, placeNewOrder } =
    useContext(RestaurantContext);
  const { user } = useAuthContext();

  console.log(userAddedOrders);

  {
    /* <button
                onClick={() =>
                  placeNewOrder(user._id, restaurant._id, userAddedOrders)
                }
              ></button> */
  }

  // const totalPrice = placedOrders?.newOrder?.menu?.reduce((acc, item) => {
  //   acc += item.price;
  //   return acc;
  // }, 0);

  // const vat = (totalPrice * 10) / 100;
  // constfinalPrice = totalPrice + vat;
  // const formattedTotalPrice = totalPrice.toFixed(2);
  // const formattedVat = vat.toFixed(2);
  // const formattedFinalPrice = finalPrice.toFixed(2);

  return (
    <>
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Secure Checkout
                <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
              </h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={user?.email}
                    className="mt-1 block w-full rounded border-gray-800 bg-gray-50 py-3 px-4 text-sm placeholder-gray-700 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="card-number"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Card number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    placeholder="1234-5678-XXXX-XXXX"
                    required
                    className="block w-full rounded border-gray-800 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                  <img
                    src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                    alt=""
                    className="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    Expiration date
                  </p>
                  <div className="mr-6 flex flex-wrap">
                    <div className="my-1">
                      <label htmlFor="month" className="sr-only">
                        Select expiration month
                      </label>
                      <select
                        name="month"
                        id="month"
                        required
                        className="cursor-pointer rounded border-gray-800 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="my-1 ml-3 mr-6">
                      <label htmlFor="year" className="sr-only">
                        Select expiration year
                      </label>
                      <select
                        name="year"
                        id="year"
                        required
                        className="cursor-pointer rounded border-gray-800 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 8 }, (_, i) => (
                          <option key={i} value={2024 + i}>
                            {2024 + i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative my-1">
                      <label htmlFor="security-code" className="sr-only">
                        Security code
                      </label>
                      <input
                        type="text"
                        id="security-code"
                        name="security-code"
                        placeholder="Security code"
                        required
                        className="block w-36 rounded border-gray-800 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="card-name" className="sr-only">
                    Card name
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    name="card-name"
                    placeholder="Name on the card"
                    required
                    className="mt-1 block w-full rounded border-gray-800 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                  By placing this order you agree to the{" "}
                  <a
                    href="#"
                    className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
                  >
                    Terms and Conditions
                  </a>
                </p>
                <button
                  onClick={() =>
                    placeNewOrder(user._id, restaurant._id, userAddedOrders)
                  }
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <div>
              <div className="absolute inset-0 min-h-screen bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
            </div>
            <div className="relative">
              <h2 className="text-3xl">Your order summary </h2>

              {
                <>
                  <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                  <div className="space-y-2">
                    <p className="flex justify-between text-lg font-bold text-white">
                      <span>SubTotal price:</span>
                      <span>
                        {" "}
                        {userAddedOrders
                          .reduce((acc, item) => {
                            const totalPrice = (acc +=
                              item.price * item.quantity);
                            return totalPrice;
                          }, 0)
                          .toFixed(2)}
                        €
                      </span>
                    </p>
                    <p className="flex justify-between text-lg font-bold text-white">
                      <span>Delivery: 10% </span>
                      <span>
                        {(
                          userAddedOrders.reduce((acc, item) => {
                            const totalPrice = acc + item.price * item.quantity;
                            return totalPrice;
                          }, 0) * 0.1
                        ).toFixed(2)}
                        €
                      </span>{" "}
                    </p>
                    <hr />
                    <p>
                      <span className="flex justify-between  text-lg font-bold text-white">
                        <span className="text-white">Total price:</span>
                        <span>
                          {(
                            userAddedOrders.reduce((acc, item) => {
                              const totalPrice =
                                acc + item.price * item.quantity;
                              return totalPrice;
                            }, 0) * 1.1
                          ).toFixed(2)}
                          €
                        </span>{" "}
                      </span>
                    </p>
                  </div>
                </>
              }

              <div className="text-lg font-bold flex flex-col gap-2 mr-5 ">
                <h2 className="text-2xl">Sending address:</h2>
                <span>Street: {user?.address?.street}</span>
                <span>City: {user?.address?.city}</span>
                <span>Postal Code: {user?.address?.postalCode}</span>
                <span>Country: {user?.address?.country}</span>
              </div>
              <hr className="my-5" />
              <p className="text-lg font-bold">
                The order will be sent to this address. If you wish to change it
                or update it please click{" "}
                <Link className="text-white" to="/address">
                  here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
