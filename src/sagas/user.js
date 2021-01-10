import {take, put, call, fork} from 'redux-saga/effects';
import {Actions} from 'react-native-router-flux';

import _ from 'lodash';

import ApiSauce from '../services/ApiSauce';
import {USER} from '../actions/ActionTypes';
import {success, failure, logout} from '../actions/UserActions';

import {kApiLogin, kApiLogout} from '../config/WebService';

import ErrorHelper from '../helpers/ErrorHelper';

function redirectUser(url, response, payload) {
  if (url === kApiLogin) {
    Actions.dashboard();
  }
}

function callPostRequest(url, data, headers) {
  return ApiSauce.post(url, data, headers);
}

function callGetRequest(url, data, headers) {
  return ApiSauce.get(url, data, headers);
}

function* watchRequest() {
  while (true) {
    const {url, payload} = yield take(USER.REQUEST);
    try {
      let response;

      response = yield call(callPostRequest, url, payload);

      const error = response.error;

      if (url.indexOf('logout') !== -1) {
        yield put(success({}));
      } else {
        yield put(success(response));
      }

      redirectUser(url, response, payload);
    } catch (err) {
      yield put(failure(err.message));

      if (url.includes('logout')) {
        ErrorHelper.handleErrors(err, false);
      } else {
        ErrorHelper.handleErrors(err, true);
      }
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
