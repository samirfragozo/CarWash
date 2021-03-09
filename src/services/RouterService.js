import {NavigationActions, StackActions} from 'react-navigation';

let _router;

function back() {
  _router.dispatch(NavigationActions.back());
}

function navigate(routeName, params) {
  _router.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function popToTop() {
  _router.dispatch(StackActions.popToTop());
}

function setTopLevelRouter(routerRef) {
  _router = routerRef;
}

export default {
  back,
  navigate,
  popToTop,
  setTopLevelRouter,
};
