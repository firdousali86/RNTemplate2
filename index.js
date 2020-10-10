/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src";
import {name as appName} from './app.json';
// import bgMessaging from "./bgMessaging";
// import utils from "./src/util";

// consoleLog = utils.consoleLog;

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask(
//   "RNFirebaseBackgroundMessage",
//   () => bgMessaging
// );
