import { axiosClient } from "./axios-client";

class OrderApi {
  ///SignIn
  getListOrder() {
    return axiosClient({
      method: "get",
      url: "/odata/Orders",
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
  updateCarts(id, payload) {
    return axiosClient({
      method: "put",
      url: `/odata/Orders(${id})`,
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
