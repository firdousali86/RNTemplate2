// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import {method} from 'lodash';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
  },
  buttonStyle: {
    height: Metrics.ratio(44),
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.smallMargin,
  },
});
