import { LOAD } from 'redux-storage';
import { take, fork, select } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
// import { getUser } from "../reducers/selectors";
// import SagaHelper from '../helpers/SagaHelper';

function* watchReduxLoadFromDisk() {
  while (true) {
    yield take(LOAD);
    try {
      // const { data } = yield select(getUser);
      // if (data.accessToken && data.ttl && (data.id || data.userId)) {
      //   const userType = data.userType;
      //   const mobileNumber = data.mobileNumber;
      //   const isStoreCreated = data.isStoreCreated;
      //   if (!userType) {
      //     Actions.selectUserType();
      //   } else if (!mobileNumber) {
      //     Actions.enterContactNumber();
      //   } else if (userType === "shopOwner" && !isStoreCreated) {
      //     Actions.createStore();
      //   } else {
      //     SagaHelper.redirectToHome(userType, { type: "reset" });
      //   }
      // }
    } catch (err) {
      console.warn('saga watchReduxLoadFromDisk error: ', err);
    }
  }
}

export default function* root() {
  yield fork(watchReduxLoadFromDisk);
}
