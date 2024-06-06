import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

//assets
import scoop1 from "../../public/icons/scoop1.png";
import scoops2 from "../../public/icons/scoops2.png";
import scoops3 from "../../public/icons/scoops3.png";
import traditional from "../../public/icons/tradL.png";
import vegetarian from "../../public/icons/vegeN.png";

//redux
import { CartItem, addItem } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const CreamDetails: React.FC = () => {
  const [iceCream, setIceCream] = React.useState<{
    id: string;
    imageUrl2: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const typeNames = ["traditional", "vegetarian"];
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeDesc, setActiveDesc] = React.useState(0);

  const nutritions = [
    { name: "Calories", amount: "130" },
    { name: "Total Fat 5g", amount: "6%" },
    { name: "Cholesterol 0mg", amount: "0%" },
    { name: "Protein 8g", amount: "16%" },
    { name: "Vitamin D 7mcg", amount: "35%" },
    { name: "Calcium 310mg", amount: "25%" },
    { name: "Iron 0.3mg", amount: "2%" },
  ];

  React.useEffect(() => {
    async function fetchIceCream() {
      try {
        const { data } = await axios.get(
          "https://650843f156db83a34d9c06b2.mockapi.io/items/" + id
        );
        setIceCream(data);
      } catch (error) {
        alert("Error");
        navigate("/");
      }
    }

    fetchIceCream();
    window.scrollTo(0, 0);
  }, []);

  if (!iceCream) {
    return <>"Loading..."</>;
  }

  const onClickAddCream = () => {
    const item: CartItem = {
      id: iceCream.id,
      title: iceCream.title,
      price: iceCream.price,
      imageUrl1: iceCream.imageUrl2,
      size: iceCream.sizes[activeSize],
      type: typeNames[activeType],
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <div>
      <div className="detailsLayout">
        <div className="detailsLayout__element--1">
          <img
            className="object-cover h-[436px] mx-auto"
            src={iceCream.imageUrl2}
            alt="Cream Pic"
          />
        </div>

        <div className="detailsLayout__element--2">
          <h1 className="font-bold text-5xl">{iceCream.title}</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever.
          </p>
          <div>
            <h2 className="font-bold text-xl mb-2">SELECT MILK</h2>
            <ul className="flex gap-6">
              <li
                onClick={() => {
                  setActiveType(0);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={` ${
                    activeType === 0
                      ? "w-[72px] h-[72px] flex justify-center items-center border-dashed border-2 border-pink rounded-full p-1"
                      : "w-[72px] h-[72px] flex justify-center items-center p-1"
                  } `}
                >
                  <img
                    className="w-[60px] h-[60px]"
                    src={traditional}
                    alt="icon tl"
                  />
                </div>

                <span>{typeNames[0]}</span>
              </li>
              <li
                onClick={() => {
                  setActiveType(1);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={` ${
                    activeType === 1
                      ? "w-[72px] h-[72px] flex justify-center items-center border-dashed border-2 border-pink rounded-full p-1"
                      : "w-[72px] h-[72px] flex justify-center items-center p-1"
                  } `}
                >
                  <img
                    className="w-[60px] h-[60px]"
                    src={vegetarian}
                    alt="icon vn"
                  />
                </div>

                <span>{typeNames[1]}</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-2">SELECT SIZE</h2>
            <ul className="flex gap-4">
              <li
                onClick={() => {
                  setActiveSize(0);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={` ${
                    activeSize === 0
                      ? "w-[72px] h-[72px] flex justify-center items-center border-dashed rounded-full border-2 border-red-200"
                      : "w-[72px] h-[72px] flex justify-center items-center"
                  } `}
                >
                  <img className="w-[60px] h-[60px]" src={scoop1} alt="icon" />
                </div>
                <span>1 scoop</span>
              </li>
              <li
                onClick={() => {
                  setActiveSize(1);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={` ${
                    activeSize === 1
                      ? "w-[72px] h-[72px] flex justify-center items-center border-dashed rounded-full border-2 border-red-200"
                      : "w-[72px] h-[72px] flex justify-center items-center"
                  } `}
                >
                  <img className="w-[60px] h-[60px]" src={scoops2} alt="icon" />
                </div>
                <span>2 scoops</span>
              </li>
              <li
                onClick={() => {
                  setActiveSize(2);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={` ${
                    activeSize === 2
                      ? "w-[72px] h-[72px] flex justify-center items-center border-dashed rounded-full border-2 border-red-200"
                      : "w-[72px] h-[72px] flex justify-center items-center"
                  } `}
                >
                  <img className="w-[60px] h-[60px]" src={scoops3} alt="icon" />
                </div>
                <span>3 scoops</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="detailsLayout__element--3">
          <ul className="flex justify-center border-2 border-gray-800 rounded-xl cursor-pointer">
            <li
              onClick={() => {
                setActiveDesc(0);
              }}
              className={` ${
                activeDesc === 0
                  ? "bg-yellow-100 rounded-xl p-2"
                  : "rounded-xl p-2"
              } `}
            >
              <h2 className="font-bold text-xl">INGREDIENTS</h2>
            </li>
            <hr className="border-l-2 border-gray-800 h-[44px]" />
            <li
              onClick={() => {
                setActiveDesc(1);
              }}
              className={` ${
                activeDesc === 1
                  ? "bg-yellow-100 rounded-xl p-2"
                  : "rounded-xl p-2"
              } `}
            >
              <h2 className="font-bold text-xl">NUTRITIOUS</h2>
            </li>
          </ul>
          {activeDesc === 0 ? (
            <p className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. <b>Lorem</b> Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an <b>unknown</b> printer
              took a galley of type and <b>scrambled</b> it to make a type
              specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining <b>essentially</b>{" "}
              unchanged.
            </p>
          ) : (
            <table className="w-full bg-white border border-white border-separate rounded-xl [&>*:nth-child(even)]:bg-bg">
              {nutritions.map((obj: any) => (
                <tbody key={obj.name}>
                  <tr>
                    <td className="py-1 pl-1">{obj.name}</td>
                    <td className="pr-1 text-right">{obj.amount}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}

          <button onClick={onClickAddCream} className="mainButton details">
            <span className="mx-auto">{iceCream.price}$ | ADD TO CART</span>
            <div className="wave"></div>
          </button>
        </div>
      </div>
      <Link to="/">
        <span className="flex gap-2 hover:scale-x-105 duration-300 mt-4 ml-6">
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

export default CreamDetails;
