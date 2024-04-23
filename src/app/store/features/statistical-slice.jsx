import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statisticalApi from "./services/statistical-api";

export const STATISTICAL = "statisticalSlice";
export const GET_STATISTICAL_PRODUCT_BESTSALLER =
  "statistical/gets/productbestsaller";
export const GET_STATISTICAL_PRODUCT_BESTSALLER_ORDER =
  "statistical/gets/productbestsaller/order";

export const getProductStatistical = createAsyncThunk(
  GET_STATISTICAL_PRODUCT_BESTSALLER,
  async (query, { rejectWithValue }) => {
    try {
      const response = await statisticalApi.getProductStatistical(query);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const getProductBestsaller = createAsyncThunk(
  GET_STATISTICAL_PRODUCT_BESTSALLER_ORDER,
  async (options, { rejectWithValue }) => {
    try {
      const response = await statisticalApi.getProductBestsaller(options);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  statisticals: [],
  error: false,
  loadding: null,
  statisticalOrders: [],
  statisticalOrdersError: null,
  statisticalOrdersLoadding: false,
};
const StatisticalSlice = createSlice({
  name: STATISTICAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Register */
    builder
      .addCase(getProductBestsaller.pending, (state) => {
        state.statisticalOrdersLoadding = true;
      })
      .addCase(getProductBestsaller.fulfilled, (state, { payload }) => {
        state.statisticalOrders = payload.Payload;
        state.statisticalOrdersLoadding = false;
        state.statisticalOrdersError = null;
      })
      .addCase(getProductBestsaller.rejected, (state, { payload }) => {
        state.statisticalOrdersError = payload.Payload;
      })
      .addCase(getProductStatistical.pending, (state) => {
        state.loadding = true;
      })
      .addCase(getProductStatistical.fulfilled, (state, { payload }) => {
        state.statisticals = payload.Payload;
        state.loadding = false;
        state.error = null;
      })
      .addCase(getProductStatistical.rejected, (state, { payload }) => {
        state.error = payload.Payload;
      });
  },
});

const { reducer, actions } = StatisticalSlice;
export const selectStatistical = (state) => state.statisticals;

export default reducer;
export const { increment, decrement } = actions;
