import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderBackComponent from './components/HeaderBackComponent';
import HeaderRightComponent from './components/HeaderRightComponent';
import HeaderTitleComponent from './components/HeaderTitleComponent';
import AddClient from './screens/AddClientScreen';
import AddProductScreen from './screens/AddProductScreen';
import AddServiceScreen from './screens/AddServiceScreen';
import AddVehicle from './screens/AddVehicleScreen';
import EditClient from './screens/EditClientScreen';
import EditLessee from './screens/EditLesseeScreen';
import EditVehicle from './screens/EditVehicleScreen';
import Home from './screens/HomeScreen';
import Load from './screens/LoadScreen';
import Login from './screens/LoginScreen';
import NewOrder from './screens/NewOrderScreen';
import Order from './screens/OrderScreen';
import ProductsScreen from './screens/ProductsScreen';
import SelectClient from './screens/SelectClientScreen';
import ServicesScreen from './screens/ServicesScreen';
import colors from './vars/colors';

const AppStack = createStackNavigator(
  {
    AddClient,
    AddProductScreen,
    AddServiceScreen,
    AddVehicle,
    EditClient,
    EditLessee,
    EditVehicle,
    Home,
    NewOrder,
    Order,
    ProductsScreen,
    SelectClient,
    ServicesScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      headerBackImage: (props) => (
        <HeaderBackComponent {...props} navigation={navigation} />
      ),
      headerRight: (props) => (
        <HeaderRightComponent {...props} navigation={navigation} />
      ),
      headerStyle: {
        backgroundColor: colors.BLACK,
      },
      headerTintColor: colors.WHITE,
      headerTitle: (props) => <HeaderTitleComponent {...props} />,
    }),
  },
);

const AuthStack = createStackNavigator({
  Login: {screen: Login, navigationOptions: {headerShown: false}},
});

const MainNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    Load,
  },
  {initialRouteName: 'Auth'},
);

const Router = createAppContainer(MainNavigator);

export default Router;
