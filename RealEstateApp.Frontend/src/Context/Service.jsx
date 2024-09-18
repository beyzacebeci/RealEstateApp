import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7145/api/",
  timeout: 6000,
});

//localStorageden tokeni al
const token = localStorage.getItem("token");
if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getAPI = async (url) => {
  return await api
    .get(url)
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response,
      };
    });
};

export const postAPI = async (url, data, headers) => {
  return await api
    .post(url, data, headers && headers)
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response,
      };
    });
};

export const putAPI = async (url, data) => {
  return await api
    .put(url, data)
    .then((response) => {
      return {
        status: response.status,
        data: response.data || {},
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response,
      };
    });
};

export const deleteAPI = async (url) => {
  return await api
    .delete(url)
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response,
      };
    });
};
