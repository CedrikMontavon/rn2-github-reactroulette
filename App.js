import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
  AppLoading, Asset, Font, Icon,
} from 'expo';
import getStore from './Store/configureStore';
import NavigatorService from './navigator';
import LoginScreen from './screens/LoginScreen';
import CreateLoginScreen from './screens/CreateLoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import CameraScreen from './screens/CameraScreen';

const Navigator = createStackNavigator({
  Login: LoginScreen,
  CreateLogin: CreateLoginScreen,
  Home: HomeScreen,
  Chat: ChatScreen,
  Camera: CameraScreen,
},
{
  initialRouteName: 'Login',
});

const AppContainer = createAppContainer(Navigator);

const store = getStore();
const materialIcons = require('@expo/vector-icons/fonts/MaterialIcons.ttf');
const spaceMono = require('./assets/fonts/SpaceMono-Regular.ttf');
const rricon = require('./assets/images/rricon.png');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }


  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      rricon,
    ]),
    Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': spaceMono,
      MaterialIcons: materialIcons,
    }),
  ]);

  handleLoadingError = () => {
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const cpProps = {
      ...this.props,
    };
    const cpState = {
      ...this.state,
    };

    if (cpState.isLoadingComplete || cpProps.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <AppContainer
            ref={(navigatorRef) => {
              NavigatorService.setContainer(navigatorRef);
            }}
          />
        </Provider>
      );
    }
    return (
      <AppLoading
        startAsync={this.loadResourcesAsync}
        onError={this.handleLoadingError}
        onFinish={this.handleFinishLoading}
      />
    );
  }
}

module.exports = App;
