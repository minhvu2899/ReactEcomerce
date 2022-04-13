import axiosClient from './axiosClient';

const orderTrackApi = {
  getAll(params) {
    const url = '/orders';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  getByUser(id) {
    const url = `/orders/user/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/order-track';
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

export default orderTrackApi;
