// @flow
import base64 from 'base-64';
import { create } from 'apisauce';
import { take, fork, select } from 'redux-saga/effects';

import {
  API_LOG,
  API_TIMEOUT,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_REQUEST_TIMEOUT,
  ERROR_UNAUTHORIZED
} from '../config/WebService';
import DataHelper from '../helpers/DataHelper';

getUpdatedHeader = headers => {
  if (DataHelper.getAccessToken()) {
    return {
      ...headers,
      'X-Access-Token': DataHelper.getAccessToken()
    };
  } else {
    return headers;
  }
};

const baseUrl = DataHelper.getServiceURL();

const api = create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: API_TIMEOUT
});

class ApiSauce {
  async post(url, data, headers) {
    const updatedHeader = getUpdatedHeader(headers);

    const response = await api.post(url, data, { headers: updatedHeader });

    if (__DEV__ && API_LOG) {
      console.log(response);
    }

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async get(url, data, headers) {
    const updatedHeader = getUpdatedHeader(headers);
    const response = await api.get(url, data, { headers: updatedHeader });

    if (__DEV__ && API_LOG) {
      console.log(response);
    }

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  changeUrl(newURL: String) {
    api.setBaseURL(newURL);
  }

  handlePromise = (resolve, reject, response) => {
    if (response.ok && response.data && !response.data.error) {
      resolve(response.data);
    } else {
      if (
        response.data &&
        response.data.error &&
        response.data.error.code &&
        response.data.error.code === 'AUTHORIZATION_REQUIRED'
      ) {
        reject(ERROR_UNAUTHORIZED);

        DataHelper.onLogout();
      }
      if (response.problem === 'NETWORK_ERROR') {
        reject(ERROR_NETWORK_NOT_AVAILABLE);
      }
      if (response.problem === 'TIMEOUT_ERROR') {
        reject(ERROR_REQUEST_TIMEOUT);
      }
      if (response.status === 500) {
        reject(ERROR_SOMETHING_WENT_WRONG);
      }
      reject(response.data || response);
    }
  };
}

export default new ApiSauce();
