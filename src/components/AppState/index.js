import React from "react";
import { AppState as AppStateRN } from "react-native";
import { NotificationsHelper } from "../../helpers";
export default class AppState extends React.PureComponent {
  componentDidMount() {
    AppStateRN.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppStateRN.removeEventListener("change", this._handleAppStateChange);
  }

  getCurrentState = () => AppStateRN.currentState;

  _handleAppStateChange = nextAppState => {
    const { handleAppState } = this.props;
    if (handleAppState) {
      
      NotificationsHelper.getInitialNotification();
      handleAppState(nextAppState);
    }
  };

  render() {
    return null;
  }
}
