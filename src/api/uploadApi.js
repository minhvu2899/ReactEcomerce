import axiosClient from './axiosClient';

const uploadApi = {
  getAll(params) {
    const url = '/upload';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/upload/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/upload';
    return axiosClient.post(url, data);
  },
  addMuti(data) {
    const url = '/upload/muti';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/upload/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/upload/${id}`;
    return axiosClient.delete(url);
  },
};

export default uploadApi;
