import React from "react";
import Profile from "../components/Profile";
import Address from "../components/Address";

function AddressPage() {
  return (
    <div>
      <Profile />
      <div className=" ml-96 mr-96 mt-20 ">
        <Address />
      </div>
    </div>
  );
}

export default AddressPage;
