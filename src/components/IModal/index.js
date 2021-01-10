import React from "react";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { View } from "react-native";

import { Text } from "../";
import styles from "./styles";

export default class IModal extends React.Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.node.isRequired,
    backdropOpacity: PropTypes.number,
    backdropColor: PropTypes.string,
    onBackdropPressHandler: PropTypes.func
  };

  static defaultProps = {
    containerStyle: {},
    backdropOpacity: 0.7,
    backdropColor: "white",
    onBackdropPressHandler: undefined
  };

  onBackdropPress = () => {
    const { onBackdropPressHandler } = this.props;

    if (onBackdropPressHandler) {
      onBackdropPressHandler();
    }
  };

  render() {
    const { containerStyle, children, ...rest } = this.props;

    return (
      <Modal
        style={[styles.container, { backgroundColor: "transparent" }]}
        {...rest}
        onBackdropPress={this.onBackdropPress}
      >
        <View style={[styles.modalContent, containerStyle]}>
          {this.props.children}
        </View>
      </Modal>
    );
  }
}
