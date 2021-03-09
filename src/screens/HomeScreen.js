import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {getOrders} from '../actions/appActions';
import Orders from '../components/home/OrdersComponent';
import colors from '../vars/colors';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
    };
  }

  componentDidMount() {
    const {getOrders: getOrdersAction} = this.props;

    this.props.navigation.setParams({
      settings: true,
    });

    var timer = setInterval(getOrdersAction, 30000);
    this.setState({timer})
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  static navigationOptions = () => ({
    title: '',
  });

  render() {
    const {navigation} = this.props;

    return (
      <>
        <View style={styles.view}>
          <Orders navigation={navigation} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewOrder')}
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
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps, {getOrders})(HomeScreen);

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
  view: {
    backgroundColor: colors.GREY_LIGHT,
    maxHeight: '100%',
    minHeight: '100%',
  },
});
