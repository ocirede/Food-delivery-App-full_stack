import React from 'react'
import { useAuthContext } from '../context/authContext';

function Address() {
  const {handleUpdateProfile}= useAuthContext()
    return (
        <div className=' w-1/2'>
          <h2 className="text-2xl font-semibold mb-4">Update Address</h2>
          <form onSubmit={handleUpdateProfile}  className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block font-medium">First Name</label>
              <input type="text" id="firstName" name='firstname' className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div>
              <label htmlFor="lastName" className="block font-medium">Last Name</label>
              <input type="text" id="lastName" name='lastname' className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div>
              <label htmlFor="street" className="block font-medium">Street</label>
              <input type="text" id="street" name='street' className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div>
              <label htmlFor="postalcode" className="block font-medium">Postal Code</label>
              <input type="tel" id="postalcode" name='postalCode' className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div>
              <label htmlFor="city" className="block font-medium">City</label>
              <input type="text" id="city" name='city' className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
           
            <div>
              <label htmlFor="country" className="block font-medium">Country</label>
              <input type="text" id="country" name='country' className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block font-medium">Phone Number</label>
              <input type="tel" id="phoneNumber" name='phone' className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Address</button>
          </form>
        </div>
      );
}

export default Address