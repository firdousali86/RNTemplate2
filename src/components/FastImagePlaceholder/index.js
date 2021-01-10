// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, ActivityIndicator, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Text } from '../';
import { Colors, Images } from '../../theme';
import styles from './styles';

export default class FastImagePlaceholder extends React.Component {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    placeHolder: PropTypes.string,
    showLoader: PropTypes.bool,
    cache: PropTypes.oneOf(['immutable', 'web', 'cacheOnly']),
    priority: PropTypes.oneOf(['low', 'normal', 'high']),
    resizeMode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'center'])
  };

  static defaultProps = {
    containerStyle: {},
    placeHolder: Images.mPlaceholder,
    showLoader: true,
    cache: 'immutable',
    priority: 'normal',
    resizeMode: 'cover'
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  renderLoader = () => {
    const { isLoading } = this.state;
    const { showLoader } = this.props;

    if (isLoading && showLoader) {
      return (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator size='small' color={'white'} />
        </View>
      );
    }

    return null;
  };

  renderPlaceholder = () => {
    const { placeHolder, source } = this.props;
    const { isLoading } = this.state;

    if (isLoading || !(source && source.uri)) {
      return (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#d5d5d5'
          }}
        >
          <Image
            source={placeHolder}
            style={{
              flex: 1
            }}
            resizeMethod={'auto'}
            resizeMode={'contain'}
          />
        </View>
      );
    }

    return null;
  };

  render() {
    const { containerStyle, source, priority, cache, resizeMode } = this.props;

    return (
      <View style={[containerStyle, { overflow: 'hidden' }]}>
        {source && source.uri && (
          <FastImage
            style={{ flex: 1 }}
            resizeMode={FastImage.resizeMode.cover}
            onLoadStart={() => {
              this.setState({ isLoading: true });
            }}
            onLoad={e => {
              this.setState({ isLoading: false });
            }}
            onLoadEnd={() => {
              this.setState({ isLoading: false });
            }}
            source={{
              uri: source.uri,
              priority: FastImage.priority[priority],
              cache: FastImage.cacheControl[cache]
            }}
            resizeMode={FastImage.resizeMode[resizeMode]}
          />
        )}
        {this.renderPlaceholder()}
        {source && source.uri && this.renderLoader()}
      </View>
    );
  }
}
