// @flow

import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

export default class LoadingFooter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="gray" />
      </View>
    );
  }
}
