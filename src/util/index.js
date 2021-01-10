// @flow
import {Platform, Alert, ToastAndroid} from 'react-native';
import moment from 'moment';

import {timeZone} from '../config/AppConfig';
// import DeviceInfo from "react-native-device-info";

class Util {
  getPlatform = () => Platform.OS;

  isPlatformAndroid() {
    return Platform.OS === 'android';
  }

  isJSDebugMode() {
    return typeof atob !== 'undefined';
  }

  isRelease() {
    return !(this.isJSDebugMode() || __DEV__);
  }

  showAlertWithDelay(title, message, delay = 500) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }, delay);
  }

  showYesNoMessageForObject(messageObject, onYes, onNo) {
    setTimeout(() => {
      Alert.alert(
        messageObject.title,
        messageObject.message,
        [
          {
            text: 'Yes',
            onPress: onYes,
          },
          {
            text: 'No',
            onPress: onNo,
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }, 500);
  }

  showYesNoMessage(title, message, onYes, onNo) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Yes',
            onPress: onYes,
          },
          {
            text: 'No',
            onPress: onNo,
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }, 500);
  }

  getDateFrom(givenDate: string) {
    return moment(givenDate)
      .add(timeZone, 'hours')
      .fromNow();
  }

  getFloat(value) {
    let converted = parseFloat(value);

    if (converted && typeof converted === 'number') {
      return converted;
    }

    return 0.0;
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  showToast(message: String) {
    if (this.isPlatformAndroid()) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }

  isObjectEmpty(objectToCheck) {
    return Object.keys(objectToCheck).length === 0;
  }

  extractIntegers(text) {
    if (/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(text) || text == '') {
      return text;
    }

    return '';
  }

  consoleLog = data => {
    if (!this.isRelease()) {
      console.log(data);
    }
  };
}

export default new Util();
