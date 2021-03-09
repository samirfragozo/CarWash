import React, {PureComponent} from 'react';
import { Alert } from 'react-native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {connect} from 'react-redux';
import {changeStatus, goToOrder} from '../../actions/appActions';
import {moneyFormat, textFormat} from '../../helpers/StringHelper';
import colors from '../../vars/colors';

const DEFAULT_TEXT_SIZE = 25;

class OrdersComponent extends PureComponent {
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

  renderLeftActions = (id, status) => {
    const {changeStatus: changeStatusAction} = this.props;

    return (
      <>
        {status === 'active' &&
          <RectButton style={styles.leftAction} onPress={() => Alert.alert(
            null,
            "Esta seguro que desea cancelar la orden?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Aceptar",
                onPress: () => changeStatusAction(id, 'cancel')
              },
            ],
            { cancelable: false }
          )}>
            <Text style={{color: colors.WHITE}}>Cancelar</Text>
          </RectButton>
        }
      </>
    );
  };

  renderRightActions = (id, status) => {
    const {changeStatus: changeStatusAction} = this.props;

    return (
      <>
        <RectButton style={[styles.leftAction, {backgroundColor: colors.GREEN}]} onPress={() => Alert.alert(
          null,
          "Esta seguro que desea entregar la orden?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Aceptar",
              onPress: () => changeStatusAction(id, 'paid')
            },
          ],
        )}>
          <Text style={{color: colors.WHITE}}>Pagar</Text>
        </RectButton>
        {status === 'active' &&
          <RectButton style={[styles.leftAction, {backgroundColor: colors.PRIMARY}]} onPress={() => Alert.alert(
            null,
            "Esta seguro que desea terminar la orden?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Aceptar",
                onPress: () => changeStatusAction(id, 'finished')
              },
            ],
          )}>
            <Text style={{color: colors.WHITE}}>Terminado</Text>
          </RectButton>
        }
      </>
    );
  };

  renderItem = ({item: order}) => {
    const {id, total, client, vehicle, time, start, status} = order;
    const {goToOrder: goToOrderAction} = this.props;

    return (
      <Swipeable
        renderLeftActions={() => this.renderLeftActions(id, status)}
        renderRightActions={() => this.renderRightActions(id, status)}
      >
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

export default connect(mapStateToProps, {changeStatus, goToOrder})(OrdersComponent);

const styles = StyleSheet.create({
  flatList: {
    borderColor: colors.GREY_DARK,
    borderTopWidth: 1,
    width: '100%',
  },
  image: {
    width: '20%',
  },
  leftAction: {
    backgroundColor: colors.DANGER,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  rightAction: {
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    paddingHorizontal: 30,
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
