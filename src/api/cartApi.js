import axiosClient from './axiosClient';

const cartApi = {
  getAll(params) {
    const url = '/carts';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/carts/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/carts';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/carts/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/carts/${id}`;
    return axiosClient.delete(url);
  },
};

export default cartApi;
