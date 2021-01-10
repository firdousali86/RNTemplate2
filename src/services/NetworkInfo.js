import NetInfo from '@react-native-community/netinfo';

class NetworkInfo {
  unsubscribe = undefined;

  networkInfoListener(dispatch, networkInfoAction) {
    NetInfo.fetch().then(state => {
      dispatch(networkInfoAction(state.isConnected, state.isInternetReachable));
    });

    unsubscribe = NetInfo.addEventListener(state => {
      dispatch(networkInfoAction(state.isConnected, state.isInternetReachable));
    });
  }

  removeNetworkInfoListener() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

export default new NetworkInfo();
