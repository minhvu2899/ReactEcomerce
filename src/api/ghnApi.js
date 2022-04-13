import axiosGHN from './axiosGHN';

const ghnApi = {
  getAll(params) {
    const url = '/ghtk/print';
    return axiosGHN.post(url, { params });
  },
  get(id) {
    const url = `/shiip/public-api/v2/shipping-order/create`;
    return axiosGHN.get(url);
  },
  add(data) {
    const url = '/shiip/public-api/v2/shipping-order/create';
    return axiosGHN.post(url, data);
  },
  update(data) {
    const url = `/brands/${data.id}`;
    return axiosGHN.patch(url, data);
  },
  remove(id) {
    const url = `/brands/${id}`;
    return axiosGHN.delete(url);
  },
};

export default ghnApi;
