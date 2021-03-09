import {LOGOUT, SET_STATE} from '../actions/types';

const generateArrayOfYears = () => {
  const max = new Date().getFullYear();
  const min = max - 50;
  let years = [];

  for (let i = max; i >= min; i--) {
    years.push({
      label: i.toString(),
      value: i,
    });
  }

  return years;
};

const preloadedState = {
  currency: {
    decimals: 0,
    decimals_sep: '.',
    round: false,
    symbol: '$',
    thousands_sep: ',',
  },
  activities: {},
  combos: {},
  order: {},
  orders: {},
  products: {},
  services: {},
  user: {},
  vehicle_categories: [],
  vehicle_types: {},
  lessees: [],
  years: generateArrayOfYears(),
};

export default (state = preloadedState, {payload, type}) => {
  switch (type) {
    case LOGOUT:
      return preloadedState;

    case SET_STATE:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
