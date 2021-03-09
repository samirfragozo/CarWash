import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {editOrder} from '../actions/appActions';
import {styles, pickerSelectStyles, selectIcon} from '../styles/FormStyle';
import colors from '../vars/colors';

class EditLesseeScreen extends Component {
  constructor(props) {
    super(props);

    const {
      app: {lessees, order},
    } = this.props;
    const lessee_id = order.lessee.id;

    this.state = {
      lessee_id,
      lessees,
      ...order,
    };
  }

  onSubmit = async () => {
    const {editOrder: editOrderAction} = this.props;
    const {client_id, id, lessee_id, user_id, vehicle_id} = this.state;
    const data = {
      client_id,
      id,
      lessee_id,
      user_id,
      vehicle_id,
    };

    editOrderAction(data);
  };

  static navigationOptions = () => ({
    title: 'Cambiar Lavador',
  });

  render() {
    const {navigation} = this.props;
    const {lessee_id, lessees} = this.state;
    const disabled = !lessee_id;

    return (
      <SafeAreaView>
        <View style={styles.formContainer}>
          <ScrollView style={styles.scrollView}>
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
            onPress={this.onSubmit}
            title="Editar"
            titleStyle={styles.buttonTitleStyle}
          />
          <Button
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: colors.DANGER,
            }}
            containerStyle={styles.buttonContainer}
            onPress={() => navigation.goBack()}
            title="Cancelar"
            titleStyle={styles.buttonTitleStyle}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps, {editOrder})(EditLesseeScreen);
