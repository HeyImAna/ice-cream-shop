import React from "react";
import { useDispatch } from "react-redux";
import {
  Sort,
  SortPropertyEnum,
  setSortType,
} from "../redux/slices/filterSlice";

type SortListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = React.MouseEvent<HTMLBodyElement> & {
  composedPath(): Node[];
};

type SortPopupProps = {
  value: Sort;
};

export const sortOptions: SortListItem[] = [
  { name: "Top Rated", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "Lowest Price", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "Highest Price", sortProperty: SortPropertyEnum.PRICE_DESC },
];

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = React.useState(false);

  const handleSelect = (obj: SortListItem) => {
    dispatch(setSortType(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef}>
      <div
        className="flex space-x-2 items-center cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={` ${!isVisible && "rotate-180"} `}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <p>Sort by</p>
        <p className="text-pink-400">{value.name}</p>
      </div>
      {isVisible && (
        <ul className="p-2 shadow-md rounded-lg absolute right-10 bg-bg small:left-0 small:right-0">
          {sortOptions.map((obj, i) => (
            <li
              key={i}
              onClick={() => handleSelect(obj)}
              className={` ${
                value.sortProperty === obj.sortProperty
                  ? "text-pink-400 hover:bg-pink-100 p-1 rounded-lg cursor-pointer"
                  : "p-1 rounded-lg hover:bg-pink-100 cursor-pointer"
              } `}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default SortPopup;
