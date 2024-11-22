import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/button";
import Row from "./components/row";
import calculator, { initialState } from "./util/calculator";
import { myColors } from "./styles/colors";

// create class component of App
export default class App extends Component {
  state = initialState;

  // handle tap method
  HandleTap = (type, value) => {
    this.setState((state) => calculator(type, value, state));
  };

  // render method
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>

          {/* Do create componentRow */}
          <Row>
            <Button text="AC" theme="accentBlue" onPress={() => this.HandleTap("clear")} />
            <Button text="+/-" theme="secondary" onPress={() => this.HandleTap("posneg")} />
            <Button text="%" theme="secondary" onPress={() => this.HandleTap("percentage")} />
            <Button text="/" theme="secondary" onPress={() => this.HandleTap("operator", "/")} />
          </Row>

          {/* Number */}
          <Row>
            <Button text="7" theme={"primary"} onPress={() => this.HandleTap("number", 7)} />
            <Button text="8" theme={"primary"} onPress={() => this.HandleTap("number", 8)} />
            <Button text="9" theme={"primary"} onPress={() => this.HandleTap("number", 9)} />
            <Button text="X" theme="secondary" onPress={() => this.HandleTap("operator", "*")} />
          </Row>

          <Row>
            <Button text="4" theme={"primary"} onPress={() => this.HandleTap("number", 4)} />
            <Button text="5" theme={"primary"} onPress={() => this.HandleTap("number", 5)} />
            <Button text="6" theme={"primary"} onPress={() => this.HandleTap("number", 6)} />
            <Button text="-" theme="secondary" onPress={() => this.HandleTap("operator", "-")} />
          </Row>

          <Row>
            <Button text="1" theme={"primary"} onPress={() => this.HandleTap("number", 1)} />
            <Button text="2" theme={"primary"} onPress={() => this.HandleTap("number", 2)} />
            <Button text="3" theme={"primary"} onPress={() => this.HandleTap("number", 3)} />
            <Button text="+" theme="secondary" onPress={() => this.HandleTap("operator", "+")} />
          </Row>

          <Row>
            <Button text="0" theme={"primary"} onPress={() => this.HandleTap("number", 0)} />
            <Button text="." theme={"primary"} onPress={() => this.HandleTap("number", ".")} />
            <Button text="c" theme={"primary"} onPress={() => this.HandleTap("backspace")} />
            <Button text="=" theme="accentGreen" onPress={() => this.HandleTap("equal", "=")} />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

// create styles of app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.background,
    justifyContent: "flex-end",
  },
  value: {
    color: myColors.textSecondary,
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
});