// @flow

import {
  UPDATE_DEVICE_TOKEN,
  APPSETTING_CLEAR_DEVICE_TOKEN,
  CHANGE_SERVER,
} from './ActionTypes';

export function updateToken(token: String) {
  return {
    token,
    type: UPDATE_DEVICE_TOKEN,
  };
}

export function clearDeviceToken() {
  return {type: APPSETTING_CLEAR_DEVICE_TOKEN};
}

export function changeServer(serverUrl: String) {
  return {
    serverUrl: serverUrl,
    type: CHANGE_SERVER,
  };
}
