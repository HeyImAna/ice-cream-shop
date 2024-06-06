import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

//redux
import { useSelector } from "react-redux";
import {
  setCategoryIdx,
  setCurrentPage,
  setFilters,
  filterSelector,
} from "../redux/slices/filterSlice";
import {
  fetchCream,
  creamSelector,
  SearchIceCreamParams,
} from "../redux/slices/creamSlice";

//assets
import background from "../../public/icons/bg.png";
import empty from "../../public/icons/empty.png";

//components
import CreamBlock from "../components/CreamBlock";
import Categories from "../components/Categories";
import SortPopup, { sortOptions } from "../components/SortPopup";
import Skeleton from "../components/CreamBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(creamSelector);

  //filter category
  const { categoryIdx, sortType, currentPage, searchValue } =
    useSelector(filterSelector);

  const handleClickCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryIdx(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const creamGrid = items.map((obj: any) => (
    <CreamBlock key={obj.id} {...obj} />
  ));
  const skeleton = [...new Array(3)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const getCream = async () => {
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryIdx > 0 ? `category=${categoryIdx}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchCream({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryIdx,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [currentPage, categoryIdx, sortType.sortProperty, searchValue]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchIceCreamParams;

      const sortType = sortOptions.find(
        (obj) => obj.sortProperty === params.sortBy
      );

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryIdx: Number(params.category),
          currentPage: Number(params.currentPage),
          sortType: sortType || sortOptions[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getCream();
    }

    isSearch.current = false;
  }, [currentPage, categoryIdx, searchValue, sortType.sortProperty]);

  return (
    <main className="flex flex-col justify-between">
      {!searchValue && (
        <section className="relative small:h-[530px] h-[710px] mx-auto max-w-[1280px] min-w-[330px]">
          <img
            className="object-cover w-full h-full rounded-3xl border-2 border-gray-800"
            src={background}
            alt="background image"
          />

          <button
            className="mainButton"
            onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
          >
            <span>SHOP NOW</span>
            <div className="wave"></div>
          </button>
        </section>
      )}

      <section className="my-8 mx-10 small:mx-0  flex flex-col justify-between gap-8">
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <h1 className="font-semibold leading-tight text-[clamp(28px,5vw,60px)]">
            Choose Your Color
          </h1>

          <SortPopup value={sortType} />
        </div>
        <Categories
          categoryIdx={categoryIdx}
          onChangeCategory={handleClickCategory}
        />
        {status === "error" ? (
          <div className="text-center">
            <h1 className="text-4xl font-semibold">Error</h1>
            <img className="w-24 mx-auto my-4" src={empty} alt="Sad Icon" />
            <p>No items found here</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-8">
            {status === "loading" ? skeleton : creamGrid}
          </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </section>
    </main>
  );
};

export default Home;
