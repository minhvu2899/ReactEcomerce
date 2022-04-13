import axiosClient from './axiosClient';

const roleApi = {
  getAll(params) {
    const url = '/roles';
    return axiosClient.get(url, { params });
  },
  getAllPermision(params) {
    const url = '/permission';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/roles/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/roles';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/roles/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/roles/${id}`;
    return axiosClient.delete(url);
  },
};

export default roleApi;
