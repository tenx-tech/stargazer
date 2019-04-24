import React from "react";
import { View, Text } from "react-native";

/** =======================================================
 * Screens
 * ========================================================
 */

class FirstScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>First Screen!</Text>
      </View>
    );
  }
}

class SecondScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Second Screen!</Text>
      </View>
    );
  }
}

class ThirdScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Third Screen!</Text>
      </View>
    );
  }
}

/** =======================================================
 * Export
 * ========================================================
 */

export { FirstScreen, SecondScreen, ThirdScreen };
