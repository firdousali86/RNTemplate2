import Immutable from 'seamless-immutable';
import * as types from '../actions/ActionTypes';

const initialState = Immutable({
  isNetworkConnected: false,
  isInternetReachable: false,
});

export default function networkInfo(state = initialState, action) {
  switch (action.type) {
    case types.NETWORK_INFO:
      return Immutable.merge(state, {
        isNetworkConnected: action.isNetworkConnected,
        isInternetReachable: action.isInternetReachable,
      });
    default:
      return state;
  }
}
