import React from "react";

type CategoryProps = {
  categoryIdx: number;
  onChangeCategory: (i: number) => void;
};

const categoryNames = ["All", "Gelato", "Sherbet", "Sorbet", "Yogurt"];

const Categories: React.FC<CategoryProps> = React.memo(
  ({ categoryIdx, onChangeCategory }) => {
    return (
      <ul className="categories flex space-x-3 overflow-x-scroll scroll-hidden">
        {categoryNames.map((name, i) => (
          <li
            key={name}
            onClick={() => {
              onChangeCategory(i);
            }}
            className={` ${
              categoryIdx === i
                ? "bg-yellow-100 text-center rounded-full py-2 px-6 border-2 border-gray-800 cursor-pointer"
                : "text-center hover:bg-yellow-100 rounded-full py-2 px-6 border-2 border-gray-800 cursor-pointer"
            } `}
          >
            {name}
          </li>
        ))}
      </ul>
    );
  }
);

export default Categories;
