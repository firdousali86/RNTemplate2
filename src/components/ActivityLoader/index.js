// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';
import Spinner from 'react-native-spinkit';
import {Metrics, Colors} from '../../theme';

const LOADER_SIZE = 100;

export default class ActivityLoader extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
  };

  render() {
    const {isLoading} = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: (Metrics.screenWidth - LOADER_SIZE) / 2,
          top: (Metrics.screenHeight - LOADER_SIZE) / 2 - Metrics.ratio(50),
        }}>
        <Spinner
          style={{
            marginBottom: 50,
          }}
          isVisible={isLoading}
          size={LOADER_SIZE}
          type={'Bounce'}
          color={Colors.themeColors.mangwaloBlue}
        />
      </View>
    );
  }
}
