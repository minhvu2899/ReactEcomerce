import axiosGHTK from './axiosClient';

const ghtkApi = {
  getAll(params) {
    const url = '/ghtk/print';
    return axiosGHTK.get(url, { params });
  },
  feeship(data) {
    const url = `/ghtk/feeship`;
    return axiosGHTK.post(url, data);
  },
  add(data) {
    const url = '/ghtk/print';
    return axiosGHTK.get(url);
  },
  update(data) {
    const url = `/brands/${data.id}`;
    return axiosGHTK.patch(url, data);
  },
  remove(id) {
    const url = `/brands/${id}`;
    return axiosGHTK.delete(url);
  },
};

export default ghtkApi;
