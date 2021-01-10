// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: Metrics.horizontalLineHeight,
    width: Metrics.ratio(40)
  }
});
