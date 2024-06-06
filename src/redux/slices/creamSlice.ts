import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type IceCream = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface CreamSliceType {
  items: IceCream[];
  status: "loading" | "success" | "error";
}

const initialState: CreamSliceType = {
  items: [],
  status: Status.LOADING,
};

export type SearchIceCreamParams = {
  category: string;
  order: string;
  sortBy: string;
  search: string;
  currentPage: string;
};

export const fetchCream = createAsyncThunk<IceCream[], SearchIceCreamParams>(
  "cream/fetchCreamStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<IceCream[]>(
      `https://650843f156db83a34d9c06b2.mockapi.io/items?page=${currentPage}&limit=3&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
);

const creamSlice = createSlice({
  name: "cream",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IceCream[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCream.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchCream.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchCream.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const creamSelector = (state: RootState) => state.cream;

export const { setItems } = creamSlice.actions;

export default creamSlice.reducer;
