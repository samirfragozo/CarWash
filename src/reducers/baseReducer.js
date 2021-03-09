import {
  HIDE_LOADING,
  SET_ERROR,
  SET_ERRORS,
  SHOW_LOADING,
} from '../actions/types';

const preloadedState = {
  error: {
    show: true,
    message: null,
    autoHide: true,
  },
  errors: {},
  isLoading: false,
  spinner_text: '',
};

export default (state = preloadedState, {payload, type}) => {
  switch (type) {
    case HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
        spinner_text: '',
      };

    case SET_ERROR:
      return {
        ...state,
        error: {
          showError: true,
          message: null,
          autoHide: true,
          ...payload,
        },
      };

    case SET_ERRORS:
      return {
        ...state,
        errors: payload || {},
      };

    case SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
        spinner_text: payload || '',
      };

    default:
      return state;
  }
};
