/**
 * @format
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';
import {name as appName} from '../app.json';
import * as Sentry from '@sentry/react-native';

import configureStore from './store';
import AppNavigator from './navigator';
import applyConfigSettings from './config';
import NetworkInfo from './services/NetworkInfo';
import {networkInfoListener} from './actions/NetworkInfoActions';
import {DataHelper, NotificationHelper} from './helpers';

import Utils from './util';

const reducers = require('./reducers').default;

applyConfigSettings();

Sentry.init({
  dsn:
    'https://9a218b391f854589a495ad323df79ee3@o505982.ingest.sentry.io/5595215',
});

class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      DataHelper.setStore(this.state.store);

      this.setState({isLoading: false}, () => {
        this.loadingCompleted();
      });
    }),
  };

  componentDidMount() {
    if (Utils.isPlatformAndroid()) NativeModules.SplashScreen.hide();

    NetworkInfo.networkInfoListener(
      this.state.store.dispatch,
      networkInfoListener,
    );
  }

  componentWillUnmount() {
    NetworkInfo.removeNetworkInfoListener(
      this.state.store.dispatch,
      networkInfoListener,
    );
  }

  loadingCompleted = () => {
    // RedirectionHelper.redirectIfLoggedIn(data);

    NotificationHelper.appMount();
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={{flex: 1}}>
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }
}

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
