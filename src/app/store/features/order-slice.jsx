import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "./services/order-api";

export const ORDER = "orderSlice";
export const GET_ORDER_LIST = "order/get_list";
export const ADD_ORDER_ITEM = "order/add_item";

export const getOrderList = createAsyncThunk(
  GET_ORDER_LIST,
  async ({ rejectWithValue }) => {
    try {
      const response = await orderApi.getListOrder();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
    GET_ORDER_LIST,
    async (payload,{ rejectWithValue }) => {
      try {
        const response = await orderApi.addOrder(payload);
        return response.data;
      } catch (err) {
        if (!err.response) {
          throw err;
        }
        throw rejectWithValue(err.response.data);
      }
    }
  );

export const addOrderItem = createAsyncThunk(
    ADD_ORDER_ITEM,
    async (payload,{ rejectWithValue }) => {
      try {
        const response = await orderApi.addOrder(payload);
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
  orders: [],
  order: {},
  error: false,
  loadding: false,
};
const orderSlice = createSlice({
  name: ORDER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Register */
    builder
      .addCase(getOrderList.pending, (state) => {
        state.loadding = true;
      })
      .addCase(getOrderList.fulfilled, (state, { payload }) => {
        state.orders = payload.Payload;
        state.loadding = false;
        state.error = null;
      })
      .addCase(getOrderList.rejected, (state, { payload }) => {
        state.error = payload.Payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.loadding = true;
      })
      .addCase(addOrder.fulfilled, (state, { payload }) => {
        state.order = payload.Payload;
        state.loadding = false;
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, { payload }) => {
        state.error = payload.Payload;
      });
  },
});

const { reducer, actions } = orderSlice;
export const selectProduct = (state) => state.product;

export default reducer;
export const { increment, decrement } = actions;
