import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {findClient} from '../actions/appActions';
import {styles} from '../styles/FormStyle';
import colors from '../vars/colors';

class SelectClientScreen extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const lessee_id = navigation.getParam('lessee_id', false);
    const vehicle = navigation.getParam('vehicle', false);

    this.state = {
      document: null,
      lessee_id,
      vehicle,
    };
  }

  static navigationOptions = () => ({
    title: 'Seleccionar Cliente',
  });

  render() {
    const {findClient: findClientAction, navigation} = this.props;
    const {
      document,
      lessee_id,
      vehicle: {id: vehicle_id},
    } = this.state;
    const disabled = !(
      document &&
      document.length >= 6 &&
      document.length <= 12
    );

    return (
      <SafeAreaView>
        <View style={styles.formContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>Número de documento</Text>
            <Input
              autoCapitalize="none"
              onChangeText={(value) => this.setState({document: value})}
              inputContainerStyle={styles.input}
            />
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            disabled={disabled}
            onPress={() => findClientAction(document, lessee_id, vehicle_id)}
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

export default connect(mapStateToProps, {findClient})(SelectClientScreen);
