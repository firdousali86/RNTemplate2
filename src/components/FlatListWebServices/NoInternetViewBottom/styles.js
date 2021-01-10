// @flow
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginVertical: 10
  },
  image: {
    width: 30,
    height: 30,
    margin: 10
  },
  text: {
    flex: 1,
    marginLeft: 2,
    marginRight: 8,
    lineHeight: 22,
    textAlign: "center"
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#d6d7d7"
  }
});
