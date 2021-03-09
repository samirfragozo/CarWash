import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {decrementDetail, incrementDetail} from '../actions/appActions';
import {moneyFormat, textFormat} from '../helpers/StringHelper';
import colors from '../vars/colors';

const DEFAULT_TEXT_SIZE = 22;
const TITLES = {
  activity: "Actividades",
  combo: "Combos",
  service: "Servicios",
}

class ServicesScreen extends Component {
  static navigationOptions = () => ({
    title: 'Servicios',
  });

  render() {
    const {navigation} = this.props;

    return (
      <>
        <View>
          {this.filter('combo')}
          {this.filter('service')}
          {this.filter('activity')}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddServiceScreen')}
          style={styles.button}>
          <Icon
            name="plus"
            size={25}
            type="font-awesome"
            color={colors.WHITE}
          />
        </TouchableOpacity>
      </>
    );
  }

  filter = (type) => {
    const {
      app: {
        order: {details},
      },
    } = this.props;
    const items = [];

    details.forEach((detail) => {
      if (detail.type === type) {
        items.push(detail);
      }
    });


    if (items.length > 0) {
      return (
        <>
          <View style={styles.item}>
            <Text style={styles.title}>{TITLES[type]}</Text>
          </View>
          <FlatList
            data={items}
            keyExtractor={(detail) => detail.id.toString()}
            renderItem={this.renderItem}
            style={styles.flatList}
          />
        </>
      );
    }

    return <></>;
  };

  renderItem = ({item: detail}) => {
    const {name, quantity, total} = detail;
    const {decrementDetail: decrementDetailAction, incrementDetail: incrementDetailAction} = this.props;
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.text}>{textFormat(name, DEFAULT_TEXT_SIZE)}</Text>
          <Text style={styles.title}>{moneyFormat(total)}</Text>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Icon
            name="plus"
            onPress={() => incrementDetailAction(detail)}
            raised
            size={15}
            type="font-awesome"
          />
          <Text style={styles.title}>{quantity}</Text>
          <Icon
            name="minus"
            onPress={() => decrementDetailAction(detail)}
            raised
            size={15}
            type="font-awesome"
          />
        </View>
      </View>
    );
  };
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps, {decrementDetail, incrementDetail})(ServicesScreen);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.PRIMARY,
    borderRadius: 25,
    bottom: 20,
    position: 'absolute',
    right: 20,
  },
  flatList: {
    borderColor: colors.GREY_DARK,
    borderTopWidth: 1,
    width: '100%',
  },
  item: {
    alignItems: 'center',
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
