import React from "react";
import { View, Text } from "react-native";

/** =======================================================
 * Screens
 * ========================================================
 */

/**
 * TODO: Update these and give each screen a different background,
 * and re-build the example GIF to show the different backgrounds.
 */
class FirstScreen extends React.Component {
  render() {
    return (
      <View style={screenStyles}>
        <Text style={textStyles}>First Screen!</Text>
      </View>
    );
  }
}

class SecondScreen extends React.Component {
  render() {
    return (
      <View style={screenStyles}>
        <Text style={textStyles}>Second Screen!</Text>
      </View>
    );
  }
}

class ThirdScreen extends React.Component {
  render() {
    return (
      <View style={screenStyles}>
        <Text style={textStyles}>Third Screen!</Text>
      </View>
    );
  }
}

/** =======================================================
 * Styles
 * ========================================================
 */

const screenStyles = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#629cf7"
};

const textStyles = {
  fontSize: 22,
  color: "white"
};

/** =======================================================
 * Export
 * ========================================================
 */

export { FirstScreen, SecondScreen, ThirdScreen };
