// @flow

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, StatusBar, ActivityIndicator, Text } from "react-native";
import styles from "./styles";
import { Colors, Metrics } from "../../theme";

export default class Loading extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    isBlockingLoader: PropTypes.bool
  };

  static defaultProps = {
    loading: false,
    isBlockingLoader: true
  };

  renderBlockingLoader = () => {
    const { loading } = this.props;

    return (
      <View>
        <StatusBar networkActivityIndicatorVisible={loading} />
        <Modal
          style={{ margin: 0 }}
          backdropOpacity={0.1}
          animationIn="fadeIn"
          isVisible={loading}
        >
          <View style={styles.container}>
            <ActivityIndicator
              animating
              color={Colors.loaderColor}
              size="large"
            />
          </View>
        </Modal>
      </View>
    );
  };

  renderNonBlockingLoader = () => {
    const { loading } = this.props;

    if (loading) {
      return (
        <View
          pointerEvents="none"
          style={{
            top: -6,
            bottom: 0,
            left: 0,
            right: 0,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            elevation: 5,
            width: Metrics.screenWidth,
            height: Metrics.screenHeight
          }}
        >
          <ActivityIndicator
            animating
            color={Colors.loaderColor}
            size="large"
          />
        </View>
      );
    }

    return null;
  };

  render() {
    const { isBlockingLoader } = this.props;

    if (isBlockingLoader) {
      return this.renderBlockingLoader();
    } else {
      return this.renderNonBlockingLoader();
    }
  }
}

// <Text color="primary">Loading . . .</Text>
