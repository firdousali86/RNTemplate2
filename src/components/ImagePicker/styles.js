import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.borderRadius,
    width: Metrics.screenWidth / 2.5,
    height: Metrics.screenWidth / 2.5,
    margin: Metrics.nBaseMargin,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: Metrics.screenWidth / 2.5,
    height: Metrics.screenWidth / 2.5,
    borderRadius: Metrics.borderRadius
  },
  editProfileBtnContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    borderRadius: Metrics.ratio(20),
    overflow: "hidden"
  },
  editProfileBtn: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40)
  }
});
