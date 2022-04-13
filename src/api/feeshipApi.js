import axiosClient from './axiosClient';

const feeshipApi = {
  getAll(params) {
    const url = '/feeship';
    return axiosClient.get(url, { params });
  },
  getFeeShip(params) {
    const url = '/feeship/charge';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/feeship/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/feeship';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/feeship/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/feeship/${id}`;
    return axiosClient.delete(url);
  },
};

export default feeshipApi;
