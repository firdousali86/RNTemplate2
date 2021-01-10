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

import configureStore from './store';
import AppNavigator from './navigator';
import applyConfigSettings from './config';
import NetworkInfo from './services/NetworkInfo';
import {networkInfoListener} from './actions/NetworkInfoActions';
import {DataHelper} from './helpers';

import Utils from './util';

const reducers = require('./reducers').default;

applyConfigSettings();

class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this.setState({isLoading: false}, () => {
        DataHelper.setStore(this.state.store);

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
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => App);
