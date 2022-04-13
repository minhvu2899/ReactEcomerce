import axiosClient from "./axiosClient";

const orderApi = {
  getAll(params) {
    const url = "/orders";
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  getByUser(data) {
    const url = `/orders/myOrders`;
    return axiosClient.get(url, { params: data.filters });
  },
  getByFilter(params) {
    const url = `/orders`;
    return axiosClient.get(url, { params });
  },
  getReportByCustomer(params) {
    const url = `/orders/reportByCustomer`;
    return axiosClient.get(url, { params });
  },
  getReportByProduct(params) {
    const url = `/orders/stats/product`;
    return axiosClient.get(url, { params });
  },
  reportCustomerById(params) {
    const url = `/orders/reportCustomerById`;
    return axiosClient.get(url, { params });
  },
  add(data) {
    const url = "/orders";
    return axiosClient.post(url, data);
  },
  updatePayment(data) {
    const url = `/orders/${data.id}/payment`;
    return axiosClient.patch(url, data);
  },
  updateStatus(data) {
    const url = `/orders/${data.id}/status`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/carts/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
