import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../vars/colors';

export default class HeaderRightComponent extends React.Component {
  render() {
    const {onPress} = this;

    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={onPress}>
          <Icon color={colors.WHITE} name="arrow-left" type="font-awesome" />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  onPress = () => {
    const {
      navigation: {goBack},
    } = this.props;

    goBack();
  };
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
});
