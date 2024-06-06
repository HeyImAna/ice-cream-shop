import React from "react";
import { Link } from "react-router-dom";

//components
import CartItemBlock from "../components/Cart/CartItemBlock";
import CartEmpty from "../components/Cart/CartEmpty";

//redux
import { useDispatch, useSelector } from "react-redux";
import { clearCart, cartSelector } from "../redux/slices/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(cartSelector);

  const onClickClearCart = () => {
    if (window.confirm("Empty the cart?")) {
      dispatch(clearCart());
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col max-w-[750px] mx-auto ">
      {items.length ? (
        <div className="flex flex-col gap-4 my-8 ">
          <div className="flex items-center justify-between gap-8">
            <h1 className="font-semibold text-[clamp(28px,5vw,48px)] leading-tight">
              Your Bag
            </h1>
            <svg
              onClick={onClickClearCart}
              className="w-8 pt-4 small:w-6 cursor-pointer ease-in-out duration-300 hover:opacity-80"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <path
                d="M21,6a1,1,0,0,1-1,1H4A1,1,0,0,1,4,5H9V4.5A1.5,1.5,0,0,1,10.5,3h3A1.5,1.5,0,0,1,15,4.5V5h5A1,1,0,0,1,21,6Z"
                fill="#1F2937"
              />
              <path
                d="M5.5,9v9.5A2.5,2.5,0,0,0,8,21h8a2.5,2.5,0,0,0,2.5-2.5V9ZM11,17a1,1,0,0,1-2,0V13a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V13a1,1,0,0,1,2,0Z"
                fill="#1F2937"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-4">
            {items.map((item: any) => (
              <CartItemBlock key={item.id} {...item} />
            ))}
          </div>

          <a className="mainButton cart" href="#">
            <span>Total Sum: {totalPrice}$ | PLACE ORDER</span>
            <div className="wave"></div>
          </a>
        </div>
      ) : (
        <CartEmpty />
      )}

      <Link to="/">
        <span className="flex gap-2 hover:scale-x-105 duration-300 mt-4">
          <svg
            className="w-5 "
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <g data-name="Layer 2" id="Layer_2">
              <path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z" />
            </g>
          </svg>{" "}
          back to home page{" "}
        </span>
      </Link>
    </div>
  );
};

export default Cart;
