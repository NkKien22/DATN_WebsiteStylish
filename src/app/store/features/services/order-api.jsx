import { axiosClient } from "./axios-client";

class OrderApi {
  ///SignIn
  getListOrder(odata_query) {
    return axiosClient({
      method: "get",
      url: "/odata/Orders?$count=true" + odata_query,
    });
  }
  getListOrderByUser(odata_query) {
    return axiosClient({
      method: "get",
      url: "/odata/Orders?$count=true&$filter=" + odata_query,
    });
  }
  addOrder(payload) {
    return axiosClient({
      method: "post",
      url: "/odata/Orders",
      data: payload,
    });
  }
  getByUserId(id) {
    return axiosClient({
      method: "get",
      url: `/odata/Orders/GetByUserId(userId=${id})`,
    });
  }
  updateOrder(payload) {
    return axiosClient({
      method: "put",
      url: `/odata/Orders/${payload.Id}`,
      data: payload,
    });
  }

  deleteCarts(key) {
    return axiosClient({
      method: "delete",
      url: `/odata/Orders(${key})`,
    });
  }
}

export default new OrderApi();
