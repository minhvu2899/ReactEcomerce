import axiosClient from "./axiosClient";

const productApi = {
  async getAll(params) {
    const newParams = { ...params };
    return await axiosClient.get("/products", { params: newParams });
  },
  async getAllAdmin(params) {
    const newParams = { ...params };

    return await axiosClient.get("/products", { params: newParams });
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  getProductRelated(data) {
    const { slug, ...params } = data;
    const url = `/products/${slug}/related`;
    return axiosClient.get(url, { params });
  },
  add(data) {
    const url = "/products";
    return axiosClient.post(url, data);
  },

  upload(data) {
    const url = `/products/upload/image`;
    return axiosClient.post(url, data);
  },
  removeImage(public_id) {
    const url = `/products/remove/image/${public_id}`;
    return axiosClient.delete(url);
  },
  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
