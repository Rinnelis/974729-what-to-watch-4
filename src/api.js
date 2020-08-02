import axios from "axios";
import {Error, ENTRY_POINT, REQUEST_TIMEOUT} from "./const.js";

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: ENTRY_POINT,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (err) => {
    const {response} = err;

    if (!response) {
      return Promise.reject(err);
    }

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
    }

    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onError);
  return api;
};
