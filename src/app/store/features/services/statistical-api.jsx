import { axiosClient } from "./axios-client";

class StatisticalApi {
  getProductStatistical(query) {
    return axiosClient({
      method: "get",
      url: "/odata/ProductsStatisticals?$count=true" + query,
    });
  }
  getProductBestsaller(options) {
    return axiosClient({
      method: "get",
      url: `/odata/ProductsStatisticals/GetProductsBestSeller(month=${options.Month},year=${options.Year})`,
    });
  }
}

export default new StatisticalApi();
