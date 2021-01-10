// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { Text, FastImagePlaceholder } from '../';
import styles from './styles';

export default class FastImageBackground extends React.Component {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    containerStyle: {}
  };

  render() {
    const { containerStyle, children, ...rest } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <FastImagePlaceholder
          {...rest}
          containerStyle={{
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
        />
        {this.props.children}
      </View>
    );
  }
}
