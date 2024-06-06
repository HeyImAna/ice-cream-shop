import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceType {
  searchValue: string;
  categoryIdx: number;
  currentPage: number;
  sortType: Sort;
}

const initialState: FilterSliceType = {
  searchValue: "",
  categoryIdx: 0,
  currentPage: 1,
  sortType: {
    name: "Top Rated",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIdx(state, action: PayloadAction<number>) {
      state.categoryIdx = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceType>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.sortType = action.payload.sortType;
        state.categoryIdx = Number(action.payload.categoryIdx);
      } else {
        state.currentPage = 1;
        state.categoryIdx = 0;
        state.sortType = {
          name: "Top Rated",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const sortSelector = (state: RootState) => state.filter.sortType;
export const filterSelector = (state: RootState) => state.filter;

export const {
  setCategoryIdx,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
