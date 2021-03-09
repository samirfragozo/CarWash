import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {findVehicle} from '../actions/appActions';
import {styles, pickerSelectStyles, selectIcon} from '../styles/FormStyle';
import colors from '../vars/colors';

class NewOrderScreen extends Component {
  constructor(props) {
    super(props);

    const {
      app: {lessees},
    } = this.props;
    const lessee_id = lessees.length ? lessees[0].value : [];

    this.state = {
      plate: null,
      lessee_id,
      lessees,
    };
  }

  static navigationOptions = () => ({
    title: 'Nueva Orden',
  });

  render() {
    const {findVehicle: findVehicleAction, navigation} = this.props;
    const {plate, lessee_id, lessees} = this.state;
    const disabled = !(plate && plate.length === 6) || !lessee_id;

    return (
      <SafeAreaView>
        <View style={styles.formContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>Placa</Text>
            <Input
              autoCapitalize="none"
              onChangeText={(value) => this.setState({plate: value})}
              inputContainerStyle={styles.input}
            />
            <Text style={styles.text}>Lavador</Text>
            <RNPickerSelect
              Icon={selectIcon}
              items={lessees}
              onValueChange={(value) => this.setState({lessee_id: value})}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              value={lessee_id}
            />
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            disabled={disabled}
            onPress={() => findVehicleAction(plate, lessee_id)}
            title="Confirmar"
            titleStyle={styles.buttonTitleStyle}
          />
          <Button
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: colors.DANGER,
            }}
            containerStyle={styles.buttonContainer}
            onPress={() => navigation.popToTop()}
            title="Cancelar"
            titleStyle={styles.buttonTitleStyle}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps, {findVehicle})(NewOrderScreen);
