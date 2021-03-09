import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {loadInitialData} from '../actions/appActions';
import {logOut} from '../actions/authActions';
import colors from '../vars/colors';

class LoadScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  async componentDidMount() {
    const {
      loadInitialData: loadInitialDataAction,
      logOut: LogOutAction,
      navigation,
    } = this.props;
    const error = await loadInitialDataAction();

    if (error) {
      LogOutAction();
    } else {
      navigation.navigate('App');
    }
  }

  render() {
    return <View style={styles.container} />;
  }
}

export default connect(null, {loadInitialData, logOut})(LoadScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GREY,
    maxHeight: '100%',
    minHeight: '100%',
  },
});
