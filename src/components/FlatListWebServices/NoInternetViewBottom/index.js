// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import styles from "./styles";
import { Text, ButtonView } from "../../";
import { Images } from "../../../theme";

export default class NoInternetViewBottom extends Component {
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
        <Image source={Images.iconError} style={styles.image} />
        <Text type="light" size="small" style={styles.text}>
          No internet connection. Make sure wi-fi or celluar data is turned on,
          then try again
        </Text>
        <ButtonView onPress={onRetryPress} style={styles.button}>
          <Text size="medium" type="light">
            Retry
          </Text>
        </ButtonView>
      </View>
    );
  }
}
