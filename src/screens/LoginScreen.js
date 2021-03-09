import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {getLogIn, logIn} from '../actions/authActions';
import colors from '../vars/colors';

const LOGO = require('../assets/logo.png');

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  }

  componentDidMount() {
    const {getLogIn: getLogInAction} = this.props;

    getLogInAction();
  }

  onSubmit = () => {
    const {logIn: logInAction} = this.props;
    const {username, password} = this.state;

    logInAction(username, password);
  };

  render() {
    const {username, password} = this.state;
    const disabled = !username || !password;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={LOGO} style={styles.image} />
        </View>
        <View style={styles.subtitles}>
          <Text style={styles.title}>Inicio de sesión</Text>
          <Text style={styles.subtitle}>
            Ingrese sus credenciales para iniciar sesión
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>Correo electrónico</Text>
          <Input
            containerStyle={styles.input}
            autoFocus
            autoCapitalize="none"
            keyboardType="email-address"
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            returnKeyType="next"
            onChangeText={(dataEmail) => this.setState({username: dataEmail})}
            blurOnSubmit={false}
          />
          <Text style={styles.text}>Contraseña</Text>
          <Input
            containerStyle={styles.input}
            ref={(input) => {
              this.secondTextInput = input;
            }}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(dataPassword) =>
              this.setState({password: dataPassword})
            }
            blurOnSubmit
          />
          <Button
            containerStyle={styles.buttonContainer}
            disabled={disabled}
            onPress={this.onSubmit}
            title="INICIAR SESIÓN"
          />
        </View>
      </ScrollView>
    );
  }
}

export default connect(null, {getLogIn, logIn})(LoginScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  header: {
    marginTop: 25,
  },
  image: {
    width: 300,
  },
  subtitles: {
    marginVertical: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 10,
  },
  body: {
    width: '100%',
  },
  text: {
    paddingHorizontal: 15,
  },
  input: {
    marginVertical: 5,
  },
  buttonContainer: {
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 30,
  },
});
