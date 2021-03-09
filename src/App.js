import React from 'react';
import {StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
import {Provider} from 'react-redux';
import Router from './Router';
import RouterService from './services/RouterService';
import store from './store';
import colors from './vars/colors';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      spinner_text: '',
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({isLoading: store.getState().base.isLoading});
      this.setState({spinner_text: store.getState().base.spinner_text});
    });
    DeviceInfo.isTablet()
      ? Orientation.lockToLandscape()
      : Orientation.lockToPortrait();
  }

  render() {
    const {isLoading, spinner_text} = this.state;

    return (
      <Provider store={store}>
        <Spinner
          visible={isLoading}
          textContent={spinner_text}
          textStyle={styles.spinner}
        />
        <Router
          ref={(routerRef) => {
            RouterService.setTopLevelRouter(routerRef);
          }}
        />
        <FlashMessage position="top" duration={5000} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    color: colors.WHITE,
    textAlign: 'center',
  },
});
