import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "./services/order-api";

export const ORDER = "orderSlice";
export const GET_ORDER_LIST = "order/get_list";
export const GET_ORDER_LIST_BY_USER = "order/get_list_by_user";
export const ADD_ORDER_ITEM = "order/add_item";
export const ADD_ORDER = "order/add";
export const UPDATE_STATUS_ORDER = "order/update_status";
export const SET_ORDER_UPDATE = "order/set_order_update";

export const getOrderList = createAsyncThunk(
  GET_ORDER_LIST,
  async (query, { rejectWithValue }) => {
    try {
      const response = await orderApi.getListOrder(query);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const getOrderListByUser = createAsyncThunk(
  GET_ORDER_LIST_BY_USER,
  async (query, { rejectWithValue }) => {
    try {
      const response = await orderApi.getListOrderByUser(query);
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
  ADD_ORDER,
  async (payload, { rejectWithValue }) => {
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
  async (payload, { rejectWithValue }) => {
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

export const updateStatusOrder = createAsyncThunk(
  UPDATE_STATUS_ORDER,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateOrder(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      throw rejectWithValue(error.response.data);
    }
  }
);

export const setOrderUpdate = createAsyncThunk(
  SET_ORDER_UPDATE,
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      throw rejectWithValue(error.response.data);
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
        state.orders = payload?.Payload;
        state.loadding = false;
        state.error = null;
      })
      .addCase(getOrderList.rejected, (state, { payload }) => {
        state.error = payload?.Payload;
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
      })
      .addCase(getOrderListByUser.pending, (state) => {
        state.loadding = true;
      })
      .addCase(getOrderListByUser.fulfilled, (state, { payload }) => {
        state.orders = payload.Payload;
        state.loadding = false;
        state.error = null;
      })
      .addCase(getOrderListByUser.rejected, (state, { payload }) => {
        state.error = payload.Payload;
      })
      .addCase(updateStatusOrder.pending, (state) => {
        state.loadding = true;
      })
      .addCase(updateStatusOrder.fulfilled, (state, { payload }) => {
        state.order = payload.Payload;
        let newOrders = state.orders.filter((el) => el.Id !== state.order.Id);
        state.orders = [...newOrders, payload.Payload];
        state.loadding = false;
        state.error = null;
      })
      .addCase(updateStatusOrder.rejected, (state, { payload }) => {
        state.error = payload.Payload;
      })
      .addCase(setOrderUpdate.fulfilled, (state, { payload }) => {
        state.order = payload;
      });
  },
});

const { reducer, actions } = orderSlice;
export const selectOrder = (state) => state.product;

export default reducer;
export const { increment, decrement } = actions;
