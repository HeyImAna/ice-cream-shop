import React from "react";
import { useDispatch } from "react-redux";
import {
  CartItem,
  addItem,
  minusItem,
  removeItem,
} from "../../redux/slices/cartSlice";

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl1: string;
};

const CartItemBlock: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  imageUrl1,
  count,
  type,
  size,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
        type,
        size,
      } as CartItem)
    );
  };

  const onClickMinus = () => {
    dispatch(
      minusItem({
        id,
        type,
        size,
      } as CartItem)
    );
  };

  const onClickRemove = () => {
    dispatch(
      removeItem({
        id,
        type,
        size,
      } as CartItem)
    );
  };

  return (
    <div className="p-5 medium:p-3 medium:grid medium:gap-4 medium:relative flex items-center justify-between gap-8 rounded-3xl border-2 border-gray-800">
      <div className="flex gap-2 items-center">
        <div className="w-20 bg-pink rounded-xl p-1">
          <img className="object-fit" src={imageUrl1} alt="Ice Cream" />
        </div>
        <div>
          <h2 className="text-2xl">{title}</h2>
          <span className="text-lg opacity-50">
            {type}, {size} {size === 1 ? "scoop" : "scoops"}
          </span>
        </div>
      </div>

      <div className="flex gap-4 mx-auto medium:mx-0">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className={
            count === 1
              ? "w-8 rounded-3xl border-2 border-gray-400"
              : "w-8 rounded-3xl border-2 border-gray-800 hover:bg-pink"
          }
        >
          <svg
            className="mx-auto"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="#1F2937"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill={count === 1 ? "#999999" : "#1F2937"}
            ></path>
          </svg>
        </button>
        <b className="text-2xl w-8 text-center">{count}</b>
        <button
          onClick={onClickPlus}
          className="w-8 rounded-3xl border-2 border-gray-800 hover:bg-pink"
        >
          <svg
            className="mx-auto"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="#1F2937"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#1F2937"
            ></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#1F2937"
            ></path>
          </svg>
        </button>
      </div>

      <b className="medium:absolute medium:top-9 medium:right-0 text-2xl w-20 text-center">
        {price * count}$
      </b>

      <div
        onClick={onClickRemove}
        className="group medium:absolute medium:right-3 medium:bottom-3"
      >
        <div className="cursor-pointer w-8 h-8 rounded-3xl border-2 border-gray-800 hover:bg-red-400">
          <svg
            className="rotate-45 mx-auto mt-[9px] ease-in-out duration-300 group-hover:rotate-180"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#1F2937"
            ></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#1F2937"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CartItemBlock;
