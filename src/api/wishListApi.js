import axiosClient from './axiosClient';

const wishListApi = {
  add(data) {
    const url = '/wishlist';
    return axiosClient.post(url, data);
  },
  getAll() {
    const url = '/wishlist';
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/wishlist/${id}`;
    return axiosClient.delete(url);
  },
};

export default wishListApi;
