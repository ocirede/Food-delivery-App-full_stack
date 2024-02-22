import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useAuthContext } from "../context/authContext";

function Payment() {
  const { handlePaymentSubmit, card } = useAuthContext();

  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="ml-96 mr-96 mt-20 flex items-center justify-between">
      <div className="flex flex-col gap-3 p-12">
        <h1 className="text-4xl font-extrabold font-serif">Payment method</h1>
        <h3>Credit and debit cards</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
          >
            <Plus />
          </button>
          <span>Add a card</span>
        </div>
      </div>

      {isClicked && (
        <div className="p-12">
          <form onSubmit={handlePaymentSubmit} className="w-96">
            <div className="mb-6">
              <label
                htmlFor="card-number"
                className="block text-sm font-medium text-gray-700"
              >
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="0000 0000 0000 0000"
                name="number"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="MM/YY"
                  name="expiry"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <input
                  type="number"
                  id="cvv"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="123"
                  name="ccv"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="cardholder"
                className="block text-sm font-medium text-gray-700"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholder"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="John Doe"
                name="cardholder"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              >
                Add Card
              </button>
            </div>
          </form>
        </div>
      )}
     
    </div>
  );
}

export default Payment;
