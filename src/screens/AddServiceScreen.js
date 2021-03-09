import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {incrementDetail} from '../actions/appActions';
import {moneyFormat, textFormat} from '../helpers/StringHelper';
import colors from '../vars/colors';

const DEFAULT_TEXT_SIZE = 25;
const TYPES = [
  "service",
  "combo",
  "activity",
]
const TYPE_NAMES = [
  "Servicios",
  "Combos",
  "Actividades",
]

class AddServiceScreen extends Component {
  constructor(props) {
    super(props);

    const {
      app: {
        activities,
        combos,
        order:
        {id, vehicle: {vehicle_type_id}},
        services,
      },
    } = this.props;

    this.state = {
      activities: activities[vehicle_type_id],
      combos: combos[vehicle_type_id],
      order_id: id,
      services: services[vehicle_type_id],
      type: 0,
    };
  }

  static navigationOptions = () => ({
    title: 'Agregar Servicio',
  });

  render() {
    const {activities, combos, services, type} = this.state;
    const items = [
      services,
      combos,
      activities,
    ]

    return (
      <>
        <View style={styles.container}>
          <FlatList
            data={TYPE_NAMES}
            keyExtractor={item => item}
            extraData={type}
            horizontal
            renderItem={this.renderTypeItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <FlatList
          data={items[type]}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          style={styles.flatList}
        />
      </>
    );
  }

  renderItem = ({item}) => {
    const {id: detail_id, name, price} = item;
    const {app: {order: {details}}, incrementDetail: incrementDetailAction} = this.props;
    const {order_id, type} = this.state;
    const found = details.find(element => element.detail_id === detail_id && element.type === TYPES[type]);

    if (!found) {
      return (
        <TouchableOpacity
          key={detail_id}
          onPress={() => incrementDetailAction({
            detail_id,
            order_id,
            type: TYPES[type],
          })}
          style={styles.service}>
          <>
            <Text style={styles.text}>{textFormat(name, DEFAULT_TEXT_SIZE)}</Text>
            <Text style={styles.title}>{moneyFormat(price)}</Text>
          </>
        </TouchableOpacity>
      );
    }

    return <></>;
  };
  
  renderTypeItem = ({item, index}) => {
    const {type} = this.state;

    return (
      <TouchableOpacity
        key={item}
        onPress={() => this.setState({type: index})}
        style={{
          ...styles.item,
          ...(type === index ? styles.itemSelected : {}),
        }}>
        <Text
          style={{
            ...styles.itemText,
            ...(type === index ? styles.itemTextSelected : {}),
          }}>
          {textFormat(item, DEFAULT_TEXT_SIZE)}
        </Text>
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps, {incrementDetail})(AddServiceScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.GREY_LIGHT,
    borderColor: colors.GREY_DARK,
    borderBottomWidth: 1,
    height: 50,
    paddingVertical: 5,
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 5,
    padding: 5,
    width: 120,
  },
  itemSelected: {
    backgroundColor: colors.PRIMARY,
  },
  itemText: {
    color: colors.PRIMARY,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemTextSelected: {
    color: colors.WHITE,
  },
  service: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.GREY,
    flexDirection: 'row',
    padding: 15,
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
