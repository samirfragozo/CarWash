import store from '../store';

export const textFormat = (string, size) => {
  string = string ? string.toString().toUpperCase() : '';

  return size && string.length > size
    ? `${string.substring(0, size - 3)}...`
    : string;
};

export const moneyFormat = (value) => {
  const {currency} = store.getState().app;
  const {
    decimals,
    decimals_sep: decimalsSeparator,
    round,
    symbol,
    thousands_sep: thousandsSeparator,
  } = currency;
  value = Number.parseFloat(value);

  if (round) {
    value = value.toFixed(decimals).toString();
  }

  value = value.toString().split('.');
  value[0] = value[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  if (decimals > 0) {
    value[1] = value[1] ? value[1] : '';
    value[1] = `${decimalsSeparator}${value[1]}${'0'.repeat(decimals)}`.slice(
      0,
      parseInt(decimals, 10) + 1,
    );
  } else {
    value[1] = '';
  }

  return `${symbol} ${value[0]}${value[1]}`;
};
