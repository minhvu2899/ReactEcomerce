import axiosClient from './axiosClient';

const addressApi = {
  getAll(params) {
    const url = '/addresses';
    return axiosClient.get(url, { params });
  },
  getListCity() {
    const url = `/location/city`;
    return axiosClient.get(url);
  },
  getListDistrictByCity(id) {
    const url = `/location/district?city=${id}`;
    return axiosClient.get(url);
  },
  getListWardByDistrict(id) {
    const url = `/location/ward?district=${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/addresses';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/addresses/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/addresses/${id}`;
    return axiosClient.delete(url);
  },
};

export default addressApi;
