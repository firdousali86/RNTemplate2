// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import { Text, ButtonView } from "../../";

export default class NoInternetView extends Component {
  static propTypes = {
    onRetryPress: PropTypes.func
  };

  static defaultProps = {
    onRetryPress: () => {}
  };
  render() {
    const { onRetryPress } = this.props;
    return (
      <View style={styles.container}>
        <Text size="medium" type="light" style={styles.text}>
          No internet connection. Make sure wi-fi or celluar data is turned on,
          then try again
        </Text>
        <ButtonView onPress={onRetryPress} style={styles.buttonRetry}>
          <Text size="medium" type="light">
            Retry
          </Text>
        </ButtonView>
      </View>
    );
  }
}
