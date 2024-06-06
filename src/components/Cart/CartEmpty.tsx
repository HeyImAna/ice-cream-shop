import React from "react";
import empty from "../../../public/icons/empty.png";

const CartEmpty: React.FC = () => {
  return (
    <div className="mt-24 mx-62 flex flex-col items-center gap-1 rounded-3xl border-2 border-gray-800 p-8">
      <h1 className="text-4xl font-semibold text-center">Your bag is empty</h1>
      <p className="text-center">To order ice cream, return to the main page</p>
      <img className="w-32 mt-4" src={empty} alt="Empty cart" />
    </div>
  );
};

export default CartEmpty;
