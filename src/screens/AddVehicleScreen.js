import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {createVehicle} from '../actions/appActions';
import {styles, pickerSelectStyles, selectIcon} from '../styles/FormStyle';
import colors from '../vars/colors';

class AddVehicleScreen extends Component {
  constructor(props) {
    super(props);

    const {
      app: {vehicle_categories, vehicle_types: all_vehicle_types, years},
      navigation,
    } = this.props;
    const lessee_id = navigation.getParam('lessee_id', false);
    const plate = navigation.getParam('plate', false);
    const vehicle_category_id = vehicle_categories[0]
      ? vehicle_categories[0].value
      : null;
    const vehicle_types = vehicle_category_id
      ? all_vehicle_types[vehicle_category_id]
      : [];
    const vehicle_type_id = vehicle_types.length
      ? vehicle_types[0].value
      : null;
    const year = years.length ? years[0].value : null;

    this.state = {
      brand: null,
      color: null,
      lessee_id,
      model: null,
      plate,
      vehicle_categories,
      vehicle_category_id,
      vehicle_type_id,
      vehicle_types,
      year,
      years,
    };
  }

  static navigationOptions = () => ({
    title: 'Agregar Vehículo',
  });

  onSubmit = async () => {
    const {createVehicle: createVehicleAction} = this.props;
    const {
      brand,
      color,
      lessee_id,
      model,
      plate,
      vehicle_type_id,
      year,
    } = this.state;
    const data = {brand, color, model, plate, vehicle_type_id, year};

    createVehicleAction(data, lessee_id);
  };

  render() {
    const {
      app: {vehicle_types: all_vehicle_types},
      base: {errors},
      navigation,
    } = this.props;
    const {
      brand,
      color,
      lessee_id,
      model,
      plate,
      vehicle_categories,
      vehicle_category_id,
      vehicle_type_id,
      vehicle_types,
      year,
      years,
    } = this.state;
    const {
      brand: brand_errors,
      color: color_errors,
      model: model_errors,
      plate: plate_errors,
      vehicle_type_id: vehicle_type_id_errors,
      year: year_errors,
    } = errors;
    const disabled =
      !(lessee_id && lessee_id >= 1) ||
      !(plate && plate.length === 6) ||
      !(brand && brand.length >= 3 && brand.length <= 50) ||
      !(model && model.length >= 1 && model.length <= 50) ||
      !(year && year.toString().length === 4) ||
      !(color && color.length >= 3 && color.length <= 50) ||
      !(vehicle_type_id && vehicle_type_id >= 1);

    return (
      <SafeAreaView>
        <View style={styles.formContainer}>
          <ScrollView style={styles.scrollView}>
            {plate ? (
              <>
                <Text style={styles.text}>Placa</Text>
                <Text style={styles.title}>{plate.toUpperCase()}</Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>Placa</Text>
                <Input
                  autoCapitalize="none"
                  autoFocus
                  inputContainerStyle={styles.input}
                  onChangeText={(value) => this.setState({plate: value})}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  returnKeyType="next"
                />
              </>
            )}
            {plate_errors && (
              <Text style={styles.error}>{plate_errors[0]}</Text>
            )}
            <Text style={styles.text}>Marca</Text>
            <Input
              autoFocus={!!plate}
              onChangeText={(value) => this.setState({brand: value})}
              inputContainerStyle={styles.input}
              onSubmitEditing={() => {
                this.thirdTextInput.focus();
              }}
              ref={(input) => {
                this.secondTextInput = input;
              }}
              returnKeyType="next"
            />
            {brand_errors && (
              <Text style={styles.error}>{brand_errors[0]}</Text>
            )}
            <Text style={styles.text}>Modelo</Text>
            <Input
              onChangeText={(value) => this.setState({model: value})}
              inputContainerStyle={styles.input}
              onSubmitEditing={() => {
                this.fourthTextInput.focus();
              }}
              ref={(input) => {
                this.thirdTextInput = input;
              }}
              returnKeyType="next"
            />
            {model_errors && (
              <Text style={styles.error}>{model_errors[0]}</Text>
            )}
            <Text style={styles.text}>Color</Text>
            <Input
              onChangeText={(value) => this.setState({color: value})}
              inputContainerStyle={styles.input}
              ref={(input) => {
                this.fourthTextInput = input;
              }}
            />
            {color_errors && (
              <Text style={styles.error}>{color_errors[0]}</Text>
            )}
            <Text style={styles.text}>Año</Text>
            <RNPickerSelect
              Icon={selectIcon}
              items={years}
              onValueChange={(value) => this.setState({year: value})}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              value={year}
            />
            {year_errors && <Text style={styles.error}>{year_errors[0]}</Text>}
            <Text style={styles.text}>Categoría del vehículo</Text>
            <RNPickerSelect
              Icon={selectIcon}
              items={vehicle_categories}
              onValueChange={(value) =>
                this.setState({
                  vehicle_category_id: value,
                  vehicle_types: all_vehicle_types[value],
                })
              }
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              value={vehicle_category_id}
            />
            <Text style={styles.text}>Tipo de vehículo</Text>
            <RNPickerSelect
              Icon={selectIcon}
              items={vehicle_types}
              onValueChange={(value) => this.setState({vehicle_type_id: value})}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              value={vehicle_type_id}
            />
            {vehicle_type_id_errors && (
              <Text style={styles.error}>{vehicle_type_id_errors[0]}</Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            disabled={disabled}
            onPress={this.onSubmit}
            title="Agregar"
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

const mapStateToProps = ({app, base}) => ({app, base});

export default connect(mapStateToProps, {createVehicle})(AddVehicleScreen);
