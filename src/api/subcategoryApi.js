import axiosClient from "./axiosClient";

const subcategoryApi = {
  getAll(params) {
    const url = "/subcategories";
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/subcategories/${id}`;
    return axiosClient.get(url);
  },
  getByCategory(id) {
    const url = `/subcategories/category/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/subcategories";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/subcategories/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/subcategories/${id}`;
    return axiosClient.delete(url);
  },
};

export default subcategoryApi;
