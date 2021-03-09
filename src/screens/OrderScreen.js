import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {moneyFormat, textFormat} from '../helpers/StringHelper';
import colors from '../vars/colors';

const DEFAULT_TEXT_SIZE = 25;

class SelectClientScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const id = navigation.getParam('id', 0);

    return {
      title: 'Orden #' + id,
    };
  };

  render() {
    const {
      app: {order},
      navigation,
    } = this.props;
    const {
      client,
      lessee,
      status,
      total,
      total_products,
      total_services,
      user,
      vehicle,
    } = order;

    return (
      <SafeAreaView>
        <View style={styles.formContainer}>
          <View style={styles.item}>
            <View>
              <Text style={styles.title}>{vehicle.plate}</Text>
              <Text style={styles.text}>
                {textFormat(status, DEFAULT_TEXT_SIZE)}
              </Text>
            </View>
            <Text style={styles.title}>{moneyFormat(total)}</Text>
          </View>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('EditVehicle')}>
            <Text style={styles.title}>Vehículo</Text>
            <Text style={styles.text}>{vehicle.plate}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('EditClient')}>
            <Text style={styles.title}>Cliente</Text>
            <Text style={styles.text}>
              {textFormat(client.name, DEFAULT_TEXT_SIZE)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('EditLessee')}>
            <Text style={styles.title}>Lavador</Text>
            <Text style={styles.text}>
              {textFormat(lessee.full_name, DEFAULT_TEXT_SIZE)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ServicesScreen')}>
            <Text style={styles.title}>Servicios</Text>
            <Text style={styles.text}>{moneyFormat(total_services)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductsScreen')}>
            <Text style={styles.title}>Cafeteria</Text>
            <Text style={styles.text}>{moneyFormat(total_products)}</Text>
          </TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.title}>Usuario</Text>
            <Text style={styles.text}>
              {textFormat(user.full_name, DEFAULT_TEXT_SIZE)}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps)(SelectClientScreen);

export const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    height: '90%',
  },
  item: {
    alignItems: 'center',
    height: '16.67%',
    borderBottomWidth: 1,
    borderColor: colors.GREY,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
  },
});
