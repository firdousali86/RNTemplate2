// @flow

import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Text } from "../../";

export default class EmptyView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text size="medium" type="light" textAlign="center">
          {this.props.emptyListMessage
            ? this.props.emptyListMessage
            : "No Records Found"}
        </Text>
      </View>
    );
  }
}
