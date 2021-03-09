import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {SET_ERRORS} from '../actions/types';
import store from '../store';
import config from '../vars/config';

const api = axios.create({
  baseURL: `${config.API_URL}`,
});

const beforeRequest = (request) => {
  const {access_token, token_type} = store.getState().auth.data;

  request.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${token_type} ${access_token}`,
  };

  return request;
};

const onRequestSuccess = async (response) => {
  const {data} = response;

  await store.dispatch({
    type: SET_ERRORS,
    payload: {},
  });

  return data.data || data;
};

const onRequestFailure = async (err) => {
  const {autoHide, showError, message} = store.getState().base.error;
  const {
    response: {
      data: {errors, message: errorMessage},
      status,
      statusText,
    },
  } = err;
  const description = `Error ${status} - ${errorMessage || statusText}`;

  if (showError) {
    showMessage({
      message: message || description,
      description: message ? description : null,
      type: 'danger',
      autoHide,
    });
  }

  await store.dispatch({
    type: SET_ERRORS,
    payload: errors,
  });
};

api.interceptors.request.use(beforeRequest);
api.interceptors.response.use(onRequestSuccess, onRequestFailure);

export const deleteData = async (url) => {
  return await api.delete(url);
};

export const getData = async (url, params) => {
  return await api.get(url, {params});
};

export const postData = async (url, params) => {
  return await api.post(url, {...params});
};

export const updateData = async (url, params) => {
  return await api.patch(url, {...params});
};
