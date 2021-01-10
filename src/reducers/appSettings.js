// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import * as types from '../actions/ActionTypes';
import ApiSauce from '../services/ApiSauce';
import {defaultServer} from '../config/WebService';

const initialState = Immutable({
  serverUrl: defaultServer,
  deviceToken: undefined,
  lastUserFetchTime: undefined,
  isTokenUpdatedOnServer: false,
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.CHANGE_SERVER:
      ApiSauce.changeUrl(action.serverUrl);
      return Immutable.merge(state, {
        serverUrl: action.serverUrl,
      });
    case types.UPDATE_DEVICE_TOKEN:
      return Immutable.merge(state, {
        deviceToken: action.token,
      });
    case types.APPSETTING_CLEAR_DEVICE_TOKEN: {
      return Immutable.merge(state, {
        isTokenUpdatedOnServer: false,
      });
    }

    case types.LOGOUT: {
      const deviceToken = state.deviceToken;
      const serverUrl = state.serverUrl;

      const initialCopy = _.clone(initialState);

      initialCopy.deviceToken = deviceToken;
      initialCopy.serverUrl = serverUrl;

      return initialCopy;
    }
    default:
      return state;
  }
};
