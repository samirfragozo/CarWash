import React, {Component} from 'react';
import {Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {findClient} from '../actions/appActions';
import {textFormat} from '../helpers/StringHelper';
import {styles} from '../styles/FormStyle';
import colors from '../vars/colors';

const DEFAULT_TEXT_SIZE = 25;
const WIDTH = Dimensions.get('window').width - 30;

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
      vehicle: {id: vehicle_id, clients},
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
              value={document}
            />
            <FlatList
              data={clients}
              keyExtractor={item => item}
              extraData={vehicle_id}
              horizontal
              renderItem={this.renderTypeItem}
              showsHorizontalScrollIndicator={false}
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
  
  renderTypeItem = ({item, index}) => {
    const {document} = this.state;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.setState({document: item.document})}
        style={{
          ...styles2.item,
          ...(document === item.document ? styles2.itemSelected : {}),
        }}
      >
        <Text style={styles2.itemText}>{textFormat(item.name, DEFAULT_TEXT_SIZE)}</Text>
        <Text style={styles2.itemText}>{textFormat(`${item.document_type} - ${item.document}`, DEFAULT_TEXT_SIZE)}</Text>
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps, {findClient})(SelectClientScreen);

const styles2 = StyleSheet.create({
  item: {
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 10,
    padding: 20,
    width: WIDTH,
  },
  itemSelected: {
    borderColor: colors.BLACK,
    borderWidth: 2,
  },
  itemText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
