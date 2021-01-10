import {Actions} from 'react-native-router-flux';
import {kApiLogout, defaultServer} from '../config/WebService';
import {logout, request} from '../actions/UserActions';

class DataHelper {
  store = undefined;

  setStore(store) {
    this.store = store;
  }

  getStore() {
    return this.store;
  }

  getServiceURL = () => {
    const appSettings =
      this.store && this.store.getState()
        ? this.store.getState().appSettings
        : undefined;

    if (
      appSettings &&
      appSettings.serverUrl &&
      appSettings.serverUrl.length > 0
    ) {
      return appSettings.serverUrl;
    } else {
      return defaultServer;
    }
  };

  getAccessToken = () => {
    const user =
      this.store && this.store.getState()
        ? this.store.getState().user
        : undefined;

    if (user && user.data && user.data.accessToken) {
      return user.data.accessToken;
    }

    return undefined;
  };

  isUserAuthenticated = () => {
    return this.getAccessToken() !== undefined;
  };

  onLogout = () => {
    // if (this.getUser()) {
    //   this.getStore().dispatch(
    //     request(kApiLogout(this.getUser().accessToken), {}),
    //   );
    // }

    this.getStore().dispatch(logout());
    Actions.reset('login');
  };
}

export default new DataHelper();
