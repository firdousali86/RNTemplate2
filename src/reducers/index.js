import {combineReducers} from 'redux';

import navigator from './navigator';
import networkInfo from './networkInfo';
import appSettings from './appSettings';
import user from './user';

export default combineReducers({
  route: navigator,
  networkInfo,
  appSettings,
  user,
});
