import AsyncStorage from '@react-native-async-storage/async-storage';
import {HIDE_LOADING, SHOW_LOADING} from './types';

export const clearStorage = async () => {
  await AsyncStorage.clear();
};

export const hideLoading = () => async (dispatch) => {
  await dispatch({
    type: HIDE_LOADING,
  });
};

export const showLoading = (spinner_text) => async (dispatch) => {
  await dispatch({
    type: SHOW_LOADING,
    payload: spinner_text,
  });
};
