import axiosClient from "./axiosClient";

const statisticApi = {
  getReportPeriod(params) {
    const url = "/orders/stats";
    return axiosClient.get(url, { params });
  },
  getReportLastWeek(params) {
    const url = `/orders/stats`;
    return axiosClient.get(url, { params });
  },
  getReport30Day(params) {
    const url = `/orders/stats`;
    return axiosClient.get(url, { params });
  },
  getReportYesterday(params) {
    const url = `/orders/stats`;
    return axiosClient.get(url, { params });
  },
  getReportLastTwoMonth(params) {
    const url = `/orders/stats`;
    return axiosClient.get(url, { params });
  },
};

export default statisticApi;
