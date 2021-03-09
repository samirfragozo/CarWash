import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {logOut} from '../actions/authActions';
import colors from '../vars/colors';

class HeaderRightComponent extends React.Component {
  render() {
    const {logOut: LogOutAction, navigation} = this.props;
    const settings = navigation.getParam('settings', false);

    return (
      <View style={styles.header}>
        {settings && (
          <TouchableWithoutFeedback onPress={LogOutAction}>
            <View style={styles.button}>
              <Icon color={colors.WHITE} name="bars" type="font-awesome" />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

export default connect(null, {logOut})(HeaderRightComponent);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: 50,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
});
