import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from '../vars/colors';
import {textFormat} from '../helpers/StringHelper';

const DEFAULT_TEXT_SIZE = 25;

export default class HeaderTitleComponent extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <View style={styles.header}>
        {DeviceInfo.isTablet() ? (
          <Image source={require('../assets/logo.png')} style={styles.image} />
        ) : (
          <></>
        )}
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {textFormat(children, DEFAULT_TEXT_SIZE)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  image: {
    marginLeft: 20,
    width: 110,
  },
  title: {
    position: 'absolute',
    width: '100%',
  },
  titleText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
