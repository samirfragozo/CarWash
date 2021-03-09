import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearStorage, hideLoading, showLoading} from './baseActions';
import {LOGIN, LOGOUT} from './types';
import Router from '../services/RouterService';
import config from '../vars/config';

export const getLogIn = () => async (dispatch) => {
  try {
    let data = await AsyncStorage.getItem(`${config.KEY_STORAGE}.login`);
    data = JSON.parse(data);

    if (data) {
      await dispatch(logOn(data));
    } else {
      await clearStorage();
    }
  } catch (e) {
    //
  }

  SplashScreen.hide();
};

export const logIn = (username, password) => async (dispatch) => {
  await dispatch(showLoading());

  const form_params = {
    grant_type: 'password',
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    username,
    password,
  };

  await axios
    .post(`${config.BASE_URL}/oauth/token`, form_params)
    .then(function ({data}) {
      AsyncStorage.setItem(`${config.KEY_STORAGE}.login`, JSON.stringify(data));
      dispatch(logOn(data));
    })
    .catch(function () {
      showMessage({
        message: 'Correo electrónico y/o contraseña incorrectas',
        type: 'danger',
      });

      dispatch(hideLoading());
    });
};

const logOn = (data) => async (dispatch) => {
  await dispatch({
    type: LOGIN,
    payload: data,
  });

  Router.navigate('Load');
};

export const logOut = () => async (dispatch) => {
  await dispatch(showLoading());

  await clearStorage();

  await dispatch({
    type: LOGOUT,
  });

  await dispatch(hideLoading());

  Router.navigate('Auth');
};
