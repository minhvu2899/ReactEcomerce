import axiosClient from './axiosClient';

const couponApi = {
  getAll(params) {
    const url = '/coupons';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/coupons/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/coupons';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/coupons/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/coupons/${id}`;
    return axiosClient.delete(url);
  },
  check(data) {
    const url = `/coupons/${data.coupon_code}/check?price=${data.price}`;
    return axiosClient.post(url);
  },
};

export default couponApi;
