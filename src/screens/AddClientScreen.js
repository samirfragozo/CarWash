import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {createClient} from '../actions/appActions';
import {styles, pickerSelectStyles, selectIcon} from '../styles/FormStyle';
import colors from '../vars/colors';

class AddClientScreen extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const document = navigation.getParam('document', false);
    const lessee_id = navigation.getParam('lessee_id', false);
    const vehicle_id = navigation.getParam('vehicle_id', false);

    this.state = {
      cellphone: null,
      document,
      document_type: 'CC',
      document_types: [
        {
          label: 'Cédula de Ciudadanía',
          value: 'CC',
        },
        {
          label: 'Cédula de Extranjería',
          value: 'CE',
        },
      ],
      email: null,
      facebook: null,
      instagram: null,
      lessee_id,
      name: null,
      vehicle_id,
    };
  }

  static navigationOptions = () => ({
    title: 'Agregar Cliente',
  });

  onSubmit = async () => {
    const {createClient: createClientAction} = this.props;
    const {
      cellphone,
      document,
      document_type,
      email,
      facebook,
      instagram,
      lessee_id,
      name,
      vehicle_id,
    } = this.state;
    const data = {
      cellphone,
      document,
      document_type,
      email,
      facebook,
      instagram,
      name,
    };

    createClientAction(data, lessee_id, vehicle_id);
  };

  render() {
    const {
      base: {errors},
      navigation,
    } = this.props;
    const {
      cellphone,
      document,
      document_type,
      document_types,
      email,
      facebook,
      instagram,
      name,
    } = this.state;
    const {
      cellphone: cellphone_errors,
      document: document_errors,
      document_type: document_type_errors,
      email: email_errors,
      facebook: facebook_errors,
      instagram: instagram_errors,
      name: name_errors,
    } = errors;
    const disabled =
      !document_type ||
      !(document && document.length >= 6 && document.length <= 12) ||
      !(name && name.length >= 7 && name.length <= 100) ||
      !(cellphone && cellphone.length === 10) ||
      !(!email || (email && email.length >= 10 && email.length <= 100)) ||
      !(
        !instagram ||
        (instagram && instagram.length >= 3 && instagram.length <= 50)
      ) ||
      !(
        !facebook ||
        (facebook && facebook.length >= 3 && facebook.length <= 50)
      );

    return (
      <SafeAreaView>
        <View style={styles.formContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>Tipo de documento</Text>
            <RNPickerSelect
              Icon={selectIcon}
              items={document_types}
              onValueChange={(value) => this.setState({document_types: value})}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              value={document_type}
            />
            {document_type_errors && (
              <Text style={styles.error}>{document_type_errors[0]}</Text>
            )}
            {document ? (
              <>
                <Text style={styles.text}>Número de documento</Text>
                <Text style={styles.title}>{document}</Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>Número de documento</Text>
                <Input
                  autoCapitalize="none"
                  autoFocus
                  inputContainerStyle={styles.input}
                  onChangeText={(value) => this.setState({document: value})}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  returnKeyType="next"
                />
              </>
            )}
            {document_errors && (
              <Text style={styles.error}>{document_errors[0]}</Text>
            )}
            <Text style={styles.text}>Nombre</Text>
            <Input
              autoFocus={!!document}
              onChangeText={(value) => this.setState({name: value})}
              inputContainerStyle={styles.input}
              onSubmitEditing={() => {
                this.thirdTextInput.focus();
              }}
              ref={(input) => {
                this.secondTextInput = input;
              }}
              returnKeyType="next"
            />
            {name_errors && <Text style={styles.error}>{name_errors[0]}</Text>}
            <Text style={styles.text}>Celular</Text>
            <Input
              onChangeText={(value) => this.setState({cellphone: value})}
              inputContainerStyle={styles.input}
              onSubmitEditing={() => {
                this.fourthTextInput.focus();
              }}
              ref={(input) => {
                this.thirdTextInput = input;
              }}
              returnKeyType="next"
            />
            {cellphone_errors && (
              <Text style={styles.error}>{cellphone_errors[0]}</Text>
            )}
            <Text style={styles.text}>Correo electrónico</Text>
            <Input
              onChangeText={(value) => this.setState({email: value})}
              inputContainerStyle={styles.input}
              onSubmitEditing={() => {
                this.fifthTextInput.focus();
              }}
              ref={(input) => {
                this.fourthTextInput = input;
              }}
            />
            {email_errors && (
              <Text style={styles.error}>{email_errors[0]}</Text>
            )}
            <Text style={styles.text}>Instagram</Text>
            <Input
              onChangeText={(value) => this.setState({instagram: value})}
              inputContainerStyle={styles.input}
              onSubmitEditing={() => {
                this.sixthTextInput.focus();
              }}
              ref={(input) => {
                this.fifthTextInput = input;
              }}
            />
            {instagram_errors && (
              <Text style={styles.error}>{instagram_errors[0]}</Text>
            )}
            <Text style={styles.text}>Facebook</Text>
            <Input
              onChangeText={(value) => this.setState({facebook: value})}
              inputContainerStyle={styles.input}
              ref={(input) => {
                this.sixthTextInput = input;
              }}
            />
            {facebook_errors && (
              <Text style={styles.error}>{facebook_errors[0]}</Text>
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

const mapStateToProps = ({base}) => ({base});

export default connect(mapStateToProps, {createClient})(AddClientScreen);
