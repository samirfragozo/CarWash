import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {incrementDetail} from '../actions/appActions';
import {moneyFormat, textFormat} from '../helpers/StringHelper';
import colors from '../vars/colors';

const DEFAULT_TEXT_SIZE = 25;

class AddProductScreen extends Component {
  constructor(props) {
    super(props);

    const {
      app: {
        products,
        order: {id},
      },
    } = this.props;

    this.state = {
      order_id: id,
      products,
    };
  }

  static navigationOptions = () => ({
    title: 'Agregar Producto',
  });

  render() {
    const {products} = this.state;

    return (
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={this.renderItem}
        style={styles.flatList}
      />
    );
  }

  renderItem = ({item}) => {
    const {id: detail_id, name, price} = item;
    const {app: {order: {details}}, incrementDetail: incrementDetailAction} = this.props;
    const {order_id} = this.state;
    const found = details.find(element => element.detail_id === detail_id && element.type === 'product');

    if (!found) {
      return (
        <TouchableOpacity
          key={detail_id}
          onPress={() => incrementDetailAction({
            detail_id,
            order_id,
            type: 'product',
          })}
          style={styles.product}>
          <>
            <Text style={styles.text}>{textFormat(name, DEFAULT_TEXT_SIZE)}</Text>
            <Text style={styles.title}>{moneyFormat(price)}</Text>
          </>
        </TouchableOpacity>
      );
    }

    return <></>;
  };
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps, {incrementDetail})(AddProductScreen);

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
  product: {
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
