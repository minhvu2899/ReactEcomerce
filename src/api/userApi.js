import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "/users/signup";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/users/login";
    return axiosClient.post(url, data);
  },
  get() {
    const url = `/users/me`;
    return axiosClient.get(url);
  },
  getAll(params) {
    const url = `/users`;
    return axiosClient.get(url, params);
  },
  getUserLoginGoogle() {
    const url = `/auth/google/redirect`;
    return axiosClient.get(url);
  },
  update(data) {
    const url = `/users/updateMe`;
    return axiosClient.patch(url, data);
  },
  upload(data) {
    const url = `/users/updateAvatar`;
    return axiosClient.post(url, data);
  },
  updateMyPassword(data) {
    const url = `/users/updateMyPassword`;
    return axiosClient.patch(url, data);
  },
  updateUser(data) {
    const url = `/users/${data.id}`;
    return axiosClient.patch(url, data);
  },
  forgotPassword(email) {
    const url = `/users/forgotPassword`;
    return axiosClient.post(url, email);
  },
  resetPassWord(token, data) {
    const url = `/users/resetPassWord/${token}`;
    return axiosClient.patch(url, data);
  },
};

export default userApi;
