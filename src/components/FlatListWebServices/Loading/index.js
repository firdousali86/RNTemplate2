// @flow

import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
}
