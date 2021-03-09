import React, {PureComponent} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {connect} from 'react-redux';
import {goToOrder} from '../../actions/appActions';
import {moneyFormat, textFormat} from '../../helpers/StringHelper';
import colors from '../../vars/colors';

const DEFAULT_TEXT_SIZE = 25;

class DetailsComponent extends PureComponent {
  render() {
    const {
      app: {orders},
    } = this.props;

    return (
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id.toString()}
        renderItem={this.renderItem}
        style={styles.flatList}
      />
    );
  }

  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  renderItem = ({item: order}) => {
    const {id, total, client, vehicle, time, start} = order;
    const {goToOrder: goToOrderAction} = this.props;

    return (
      <Swipeable
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderLeftActions}>
        <TouchableOpacity
          key={id}
          onPress={() => goToOrderAction(order)}
          style={styles.order}>
          <View style={styles.texts}>
            <View>
              <Text style={styles.text_bold}>
                {textFormat(vehicle.plate, DEFAULT_TEXT_SIZE)}
              </Text>
              <Text style={styles.text}>
                {textFormat(client.name, DEFAULT_TEXT_SIZE)}
              </Text>
              <Text style={styles.text}>
                {textFormat(client.cellphone, DEFAULT_TEXT_SIZE)}
              </Text>
            </View>
            <View style={styles.rightTexts}>
              <Text style={styles.rightText}>{time}</Text>
              <Text style={styles.rightText}>{start}</Text>
              <Text style={styles.rightText}>{moneyFormat(total)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps, {goToOrder})(DetailsComponent);

const styles = StyleSheet.create({
  flatList: {
    borderColor: colors.GREY_DARK,
    borderTopWidth: 1,
    width: '100%',
  },
  image: {
    width: '20%',
  },
  order: {
    borderBottomWidth: 1,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    padding: 5,
  },
  text: {
    fontSize: 15,
  },
  rightText: {
    fontSize: 15,
    textAlign: 'right',
  },
  rightTexts: {
    paddingTop: 5,
  },
  text_bold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  texts: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
