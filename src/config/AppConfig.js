import { Platform } from 'react-native';

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  allowIQKeyboardManager: true,
  allowIQKeyboardManagerToolbar: true,
  pagingRecordsPerPage: 15,
  timeZone: (-1 * new Date().getTimezoneOffset()) / 60,
  gMapAPIKey:
    Platform.OS === 'android'
      ? 'AIzaSyBxkQdnpeFEj4br3eQNg6FG_D6ReIZ-yZY'
      : 'AIzaSyC-XOFKypx0K0ORhf1JwtROD_8ZC-G_Mio'
};
