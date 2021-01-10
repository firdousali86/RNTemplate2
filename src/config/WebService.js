export const betaServerURL = 'https://api.abcd.online:3000';
export const localServerURL = 'http://192.168.0.101:3000';
export const defaultServer = betaServerURL;

export const API_TIMEOUT = 60000;

export const API = '/api';

export const kApiLogout = accessToken => {
  return `${API}/users/logout?access_token=${accessToken}`;
};

export const API_LOG = false;

export const ERROR_SOMETHING_WENT_WRONG = {
  title: 'Oh Shucks!',
  message: 'Unexpected error! Looks like we really need to look into this.',
  error: 1,
};

export const ERROR_NETWORK_NOT_AVAILABLE = {
  title: 'Oh Shucks!',
  message:
    'Slow or no internet connection. Please check your internet settings.',
  error: 1,
};

export const ERROR_UNAUTHORIZED = {
  title: 'Oops!',
  message: 'Never mind, but you are not authorized for this service.',
  error: 1,
};

export const ERROR_REQUEST_TIMEOUT = {
  title: 'Server coming slow!',
  message:
    'Looks like the server is taking too long to respond, please try again after a while.',
  error: 1,
};
