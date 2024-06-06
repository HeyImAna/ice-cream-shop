import React from "react";
import debounce from "lodash.debounce";

//redux
import { setSearchValue } from "../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
    dispatch(setSearchValue(""));
    setInput("");
    inputRef.current?.focus();
  };

  const updateSearch = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    updateSearch(e.target.value);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        value={input}
        onChange={onChangeInput}
        type="text"
        placeholder="Search"
        className="py-2 pr-2 bg-[#fff8ef] text-gray-800 italic outline-none border-b-[1.5px] border-gray-800"
      />
      {input && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="18"
          viewBox="0 0 24 24"
          width="18"
          onClick={onClickClear}
          className="absolute bottom-3 right-3 opacity-25 hover:opacity-45 cursor-pointer"
        >
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
