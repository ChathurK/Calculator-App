/* IM/2021/001 - Kumarasingha K.A.C. */

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "./components/button";
import Row from "./components/row";
import calculator, { initialState,formatNumber } from "./util/calculator";
import { myColors } from "./styles/colors";
import { evaluate, format } from "mathjs";

// create class component of App
export default class App extends Component {
  state = initialState;

  // handle tap method
  HandleTap = (type, value) => {
    this.setState((state) => {
      const newState = calculator(type, value, state);
      let result = "";
      try {
        // Check if the expression contains a division by zero
        if (/\/ 0($|\D)/.test(newState.expression)) {
          result = "Can't divide by 0";
        } else {
          result = evaluate(newState.expression);
        }
      } catch (error) {
        result = "";
      }

      // clear the result field after setting the new state
      if (type === "equal") {
        return { ...newState, result: "" };
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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.primaryTextArea}>
            {this.state.expression.split(" ").map(formatNumber).join(" ")}
          </Text>
            </ScrollView>
            
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.secondaryTextArea}>
            {this.state.result}
            </Text>
          </ScrollView>
        </View>

        <View style={styles.buttonArea}>
          <Row>
            <Button text="√" theme="extra" onPress={() => this.HandleTap("sqrt")} />
            <Button text="π" theme="extra" onPress={() => this.HandleTap("pi")} />
            <Button iconName="chevron-up" theme="extra" onPress={() => this.HandleTap("operator", "^")} />
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
    padding: 20,
  },
  buttonArea: {
    borderRadius: 20,
    backgroundColor: myColors.background,
    justifyContent: "flex-end",
    padding: 5,
  },
  scrollContainer: {
    flexGrow: 1, // ensure the content stretches horizontally
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  primaryTextArea: {
    color: myColors.textSecondary,
    fontSize: 64,
    textAlign: "right",
    whiteSpace: "nowrap", // ensure text stays on one line
    paddingTop: 30,
  },
  secondaryTextArea: {
    color: myColors.textPrimary,
    fontSize: 48,
    textAlign: "right",
    whiteSpace: "nowrap", 
  },
});