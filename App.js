/* IM/2021/001 - Kumarasingha K.A.C. */

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/button";
import Row from "./components/row";
import calculator, { initialState,formatNumber } from "./util/calculator";
import { myColors } from "./styles/colors";
import { evaluate } from "mathjs";

// create class component of App
export default class App extends Component {
  state = initialState;

  // handle tap method
  HandleTap = (type, value) => {
    this.setState((state) => {
      const newState = calculator(type, value, state);
      let result = "";
      try {
        result = evaluate(newState.expression);
        if (newState.expression.includes("/0")) {
          newState.error = true;
          result = "Can't divide by 0";
        } else {
          newState.error = false;
        }
      } catch (error) {
        newState.error = true;
        result = "Can't divide by 0";
      }
      return { ...newState, result };
    });
  };

  // render method
  render() {
    const formattedCurrentValue = this.state.currentValue.toLocaleString();
    const formattedResult = this.state.result ? this.state.result.toLocaleString(navigator.language, { maximumFractionDigits: 2 }) : "";

    return (
      <SafeAreaView style={styles.window}>
        <StatusBar style="auto" />
        <View style={styles.textArea}>
          <Text id="primaryTextArea" style={styles.primaryTextArea}>
            {this.state.expression.split(" ").map(formatNumber).join(" ")}
          </Text>
          <Text id="secondaryTextArea" style={[styles.secondaryTextArea, this.state.error && { color: myColors.errorOrange }]}>
            {this.state.operator === null ? "" : formattedResult}
          </Text>
        </View>

        <View style={styles.buttonArea}>
          <Row>
            <Button iconName="square-root" theme="extra" onPress={() => this.HandleTap("operator", "sqrt")} />
            <Button text="π" theme="extra" onPress={() => this.HandleTap("operator", "pi")} />
            <Button iconName="exponent" theme="extra" onPress={() => this.HandleTap("operator", "^")} />
            <Button iconName="exclamation" theme="extra" onPress={() => this.HandleTap("operator", "!")} />
          </Row>

          <Row>
            <Button text="AC" theme="accentBlue" onPress={() => this.HandleTap("clear")} />
            <Button iconName="plus-minus" theme="secondary" onPress={() => this.HandleTap("posneg")} />
            <Button text="%" theme="secondary" onPress={() => this.HandleTap("percentage")} />
            <Button iconName="slash-forward" theme="secondary" onPress={() => this.HandleTap("operator", "/")} />
          </Row>

          <Row>
            <Button text="7" theme={"primary"} onPress={() => this.HandleTap("number", 7)} />
            <Button text="8" theme={"primary"} onPress={() => this.HandleTap("number", 8)} />
            <Button text="9" theme={"primary"} onPress={() => this.HandleTap("number", 9)} />
            <Button iconName="multiplication" theme="secondary" onPress={() => this.HandleTap("operator", "*")} />
          </Row>

          <Row>
            <Button text="4" theme={"primary"} onPress={() => this.HandleTap("number", 4)} />
            <Button text="5" theme={"primary"} onPress={() => this.HandleTap("number", 5)} />
            <Button text="6" theme={"primary"} onPress={() => this.HandleTap("number", 6)} />
            <Button iconName="minus" theme="secondary" onPress={() => this.HandleTap("operator", "-")} />
          </Row>

          <Row>
            <Button text="1" theme={"primary"} onPress={() => this.HandleTap("number", 1)} />
            <Button text="2" theme={"primary"} onPress={() => this.HandleTap("number", 2)} />
            <Button text="3" theme={"primary"} onPress={() => this.HandleTap("number", 3)} />
            <Button iconName="plus" theme="secondary" onPress={() => this.HandleTap("operator", "+")} />
          </Row>

          <Row>
            <Button text="0" theme={"primary"} onPress={() => this.HandleTap("number", 0)} />
            <Button iconName="circle-small" theme={"primary"} onPress={() => this.HandleTap("number", ".")} />
            <Button iconName="backspace" theme={"primary"} onPress={() => this.HandleTap("backspace")} />
            <Button iconName="equal" theme="accentGreen" onPress={() => this.HandleTap("equal", "=")} />
          </Row>
        </View>
      </SafeAreaView>
    );
  }
}

// create styles of app
const styles = StyleSheet.create({
  window: {
    flex: 1,
    backgroundColor: myColors.primary,
  },
  textArea: {
    display: "flex",
    backgroundColor: myColors.primary,
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonArea: {
    borderRadius: 20,
    backgroundColor: myColors.background,
    justifyContent: "flex-end",
    padding: 5,
  },
  primaryTextArea: {
    color: myColors.textSecondary,
    fontSize: 64,
    textAlign: "right",
    marginTop: 10,
    marginRight: 20,
    marginLeft: 10,
  },
  secondaryTextArea: {
    color: myColors.textPrimary,
    fontSize: 48,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
});