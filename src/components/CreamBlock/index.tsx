import React from "react";
import { useDispatch } from "react-redux";

import { CartItem, addItem } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const typeNames = ["traditional", "vegetarian"];

type CreamBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl1: string;
  imageUrl2: string;
  sizes: number[];
  types: number[];
  rating: number;
};

const CreamBlock: React.FC<CreamBlockProps> = ({
  id,
  title,
  price,
  imageUrl1,
  imageUrl2,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [mouseOver, setMouseOver] = React.useState(false);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl1,
      size: sizes[activeSize],
      type: typeNames[activeType],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      className=" w-70 flex flex-col gap-3  p-4 rounded-3xl border-2 border-gray-800 m-auto"
    >
      <Link to={`/cream/${id}`}>
        <div className="flex flex-col ">
          <h2 className=" font-medium text-3xl text-center">{title}</h2>
          <div className="w-40 h-40 mt-4 mx-auto">
            <img
              className="object-cover"
              src={mouseOver ? imageUrl2 : imageUrl1}
              alt="Ice-cream"
            />
          </div>
        </div>
      </Link>

      <ul className="flex justify-center gap-2">
        {types.map((typeId) => (
          <li
            key={typeId}
            onClick={() => {
              setActiveType(typeId);
            }}
            className={` ${
              activeType === typeId
                ? "bg-orange border-2 border-gray-800  py-2 px-5 rounded-3xl cursor-pointer"
                : "py-2 px-5 border-2 border-gray-800 cursor-pointer rounded-3xl"
            } `}
          >
            {typeNames[typeId]}
          </li>
        ))}
      </ul>

      <ul className="flex gap-2 justify-center ">
        {sizes.map((size, idx) => (
          <li
            key={size}
            onClick={() => {
              setActiveSize(idx);
            }}
            className={` ${
              activeSize === idx
                ? "bg-orange border-2 border-gray-800  py-2 px-3 rounded-3xl cursor-pointer"
                : "py-2 px-3 cursor-pointer border-2 border-gray-800 rounded-3xl"
            } `}
          >
            {size} {size === 1 ? "scoop" : "scoops"}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-3">
        <h3 className="font-medium text-2xl">from {price}$</h3>
        <button
          onClick={onClickAdd}
          className="hover:bg-violet-400 active:shadow-[4px_6px_0px_-4px_rgb(31,41,55)] flex items-center rounded-full border-2 border-gray-800 px-4 py-2 shadow-[5px_7px_0px_-4px_rgb(31,41,55)] bg-violet-300"
        >
          <svg
            height="12px"
            version="1.1"
            viewBox="0 0 512 512"
            width="12px"
            xmlns="http://www.w3.org/2000/svg"
            fill="1F2937"
          >
            <path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z" />
          </svg>
          &nbsp;
          <span className="font-medium text-md ">add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default CreamBlock;
