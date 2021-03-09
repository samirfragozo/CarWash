import {hideLoading, showLoading} from './baseActions';
import {SET_ERROR, SET_STATE} from './types';
import {getData, postData, updateData} from '../services/APIService';
import Router from '../services/RouterService';
import store from '../store';

const keys = [
  {
    key: 'user',
    message: 'el usuario',
    url: '/user',
  },
  {
    key: 'activities',
    message: 'las actividades',
    url: '/activities',
  },
  {
    key: 'combos',
    message: 'los combos',
    url: '/combos',
  },
  {
    key: 'products',
    message: 'los productos',
    url: '/products',
  },
  {
    key: 'services',
    message: 'los servicios',
    url: '/services',
  },
  {
    key: 'vehicle_categories',
    message: 'las categorías de vehículos',
    url: '/vehicle_categories',
  },
  {
    key: 'vehicle_types',
    message: 'los tipos de vehículos',
    url: '/vehicle_types',
  },
  {
    key: 'lessees',
    message: 'los lavadores',
    url: '/lessees',
  },
  {
    key: 'orders',
    message: 'las ordenes',
    url: '/orders',
  },
];

export const changeStatus = (order_id, status) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar cambiar el estado de la orden',
    },
  });

  const orders = await postData('/orders/change_status', {order_id, status});

  if (orders) {
    await dispatch({
      type: SET_STATE,
      payload: {
        orders,
      },
    });
  }

  await dispatch(hideLoading());
};

export const createClient = (data, lessee_id, vehicle_id) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar agregar al cliente',
    },
  });

  const client = await postData('/clients', data);

  if (client) {
    const {id: client_id} = client;

    await dispatch(createOrder(client_id, lessee_id, vehicle_id));
  }

  await dispatch(hideLoading());
};

const createOrder = (client_id, lessee_id, vehicle_id) => async (dispatch) => {
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar crear la orden',
    },
  });

  await postData(`/clients/${client_id}/vehicles/${vehicle_id}`);

  const user_id = store.getState().app.user.id;
  const order = await postData('/orders', {
    client_id,
    lessee_id,
    user_id,
    vehicle_id,
  });


  if (order) {
    Router.popToTop();
    dispatch(goToOrder(order));
  }
};

export const createVehicle = (data, lessee_id) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar agregar el vehículo',
    },
  });

  const vehicle = await postData('/vehicles', data);

  if (vehicle) {
    Router.navigate('SelectClient', {vehicle, lessee_id});
  }

  await dispatch(hideLoading());
};

export const decrementDetail = (data) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar hacer el decremento',
    },
  });

  const order = await postData(`/orders/decrement_detail`, data);

  if (order) {
    await dispatch({
      type: SET_STATE,
      payload: {
        order,
      },
    });
  }

  await dispatch(hideLoading());
};

export const editClient = (data) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar editar el cliente',
    },
  });

  const client = await updateData(`/clients/${data.id}`, data);

  if (client) {
    const order = store.getState().app.order;
    await dispatch({
      type: SET_STATE,
      payload: {
        order: {
          ...order,
          client,
        },
      },
    });

    Router.back();
  }

  await dispatch(hideLoading());
};

export const editOrder = (data) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar editar la orden',
    },
  });

  const order = await updateData(`/orders/${data.id}`, data);

  if (order) {
    await dispatch({
      type: SET_STATE,
      payload: {order},
    });

    Router.back();
  }

  await dispatch(hideLoading());
};

export const editVehicle = (data) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar editar el vehículo',
    },
  });

  const vehicle = await updateData(`/vehicles/${data.id}`, data);

  if (vehicle) {
    const order = store.getState().app.order;
    await dispatch({
      type: SET_STATE,
      payload: {
        order: {
          ...order,
          vehicle,
        },
      },
    });

    Router.back();
  }

  await dispatch(hideLoading());
};

export const findClient = (document, lessee_id, vehicle_id) => async (
  dispatch,
) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      showError: false,
    },
  });

  const client = await getData(`/clients/document/${document}`);

  if (client) {
    const {id: client_id} = client;

    await dispatch(createOrder(client_id, lessee_id, vehicle_id));
  } else {
    Router.navigate('AddClient', {document, lessee_id, vehicle_id});
  }

  await dispatch(hideLoading());
};

export const findVehicle = (plate, lessee_id) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      showError: false,
    },
  });

  const vehicle = await getData(`/vehicles/plate/${plate}`);

  if (vehicle) {
    Router.navigate('SelectClient', {vehicle, lessee_id});
  } else {
    Router.navigate('AddVehicle', {plate, lessee_id});
  }

  await dispatch(hideLoading());
};

export const getOrders = () => async (dispatch) => {
  await dispatch({
    type: SET_ERROR,
    payload: {
      showError: false,
    },
  });

  const orders = await getData('/orders');

  if (orders) {
    await dispatch({
      type: SET_STATE,
      payload: {orders},
    });
  } else {
    return true;
  }

  return false;
};

export const goToOrder = (order) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_STATE,
    payload: {order},
  });

  Router.navigate('Order', {id: order.id});

  await dispatch(hideLoading());
};

export const incrementDetail = (data) => async (dispatch) => {
  await dispatch(showLoading());
  await dispatch({
    type: SET_ERROR,
    payload: {
      message: 'Error al intentar hacer el incremento',
    },
  });

  const order = await postData(`/orders/increment_detail`, data);

  if (order) {
    await dispatch({
      type: SET_STATE,
      payload: {
        order,
      },
    });
  }

  await dispatch(hideLoading());
};

export const loadInitialData = () => async (dispatch) => {
  await dispatch(showLoading());

  for (let i = 0; i < keys.length; i++) {
    const {key, message, url} = keys[i];

    await dispatch(showLoading(`Cargando ${message}`));
    await dispatch({
      type: SET_ERROR,
      payload: {
        message: `Error cargando ${message}`,
      },
    });

    const value = await getData(url);

    if (value) {
      await dispatch({
        type: SET_STATE,
        payload: {[key]: value},
      });
    } else {
      return true;
    }
  }

  await dispatch(hideLoading());

  return false;
};
