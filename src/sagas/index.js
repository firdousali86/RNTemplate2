import {fork} from 'redux-saga/effects';
import init from './init';
import user from './user';

export default function* root() {
  yield fork(init);
  yield fork(user);
}
