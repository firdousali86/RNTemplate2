// @flow
import Immutable from 'seamless-immutable';
import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: '',
  data: {},
});

export default (state: Object = initialState, action: Object) => {
  let stateData;
  let data;

  switch (action.type) {
    case types.USER.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
      });
    case types.USER.SUCCESS:
      stateData = _.cloneDeep(state.data);

      if (action && action.data) {
        data = {...stateData, ...action.data};
      } else {
        data = stateData;
      }
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: '',
        data,
      });
    case types.USER.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage,
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
