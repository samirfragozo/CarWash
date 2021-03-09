import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../vars/colors';

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    marginHorizontal: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: 'gray',
    color: 'black',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    marginHorizontal: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: 'gray',
    color: 'black',
    marginBottom: 10,
  },
});

export const selectIcon = () => {
  return (
    <View style={styles.icon}>
      <Icon color={colors.GREY} name="caret-down" type="font-awesome" />
    </View>
  );
};

export const styles = StyleSheet.create({
  formContainer: {
    height: '90%',
    width: '100%',
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  text: {
    paddingHorizontal: 15,
  },
  input: {
    height: 35,
    marginBottom: -11,
  },
  error: {
    color: colors.DANGER,
    marginBottom: 10,
    marginTop: -11,
    paddingHorizontal: 15,
  },
  icon: {
    paddingRight: 10,
    paddingTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    height: '10%',
  },
  buttonContainer: {
    borderRadius: 0,
    width: '50%',
  },
  buttonStyle: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 0,
    height: '100%',
  },
  buttonTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
