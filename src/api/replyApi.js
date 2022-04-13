import axiosClient from './axiosClient';

const replyApi = {
  add(data) {
    const url = '/reply';
    return axiosClient.post(url, data);
  },
  // update(data) {
  //   const url = `/comments/${data.id}`;
  //   return axiosClient.patch(url, data);
  // },
  // remove(id) {
  //   const url = `/comments/${id}`;
  //   return axiosClient.delete(url);
  // },
};

export default replyApi;
