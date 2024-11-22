// Dimentions used to access the screen width and height which helps in calculating responsive layouts.
// StyleSheet define and manage styles in React Native.
// Text is used to render text in the app.
// TouchableOpacity is a wrapper which gives visual feedback when tapped on an element.
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { myColors } from "../styles/colors";

// Three properties are defined that are needed to make the button component.
    // 'onPress' is a function that is called when the button is pressed.
    // 'text' is the label that is displayed on the button.
    // 'theme' is used to change the button's appearance. 
export default ({ onPress, text, theme }) => {
    const buttonStyles = [styles.button]; // These arrays collect base styles and dynamically append additional styles to the button and text based on the properties.
    const textStyles = [styles.text];

    // Logic for theme based styling
    if (theme === "primary") {
        buttonStyles.push(styles.buttonPrimary);
        textStyles.push(styles.textPrimary);
    } else if (theme === "secondary") {
        buttonStyles.push(styles.buttonSecondary);
        textStyles.push(styles.textSecondary);
    } else if (theme === "accentGreen") {
        buttonStyles.push(styles.buttonAccentGreen);
        textStyles.push(styles.textSecondary);
    } else if (theme === "accentBlue") {
        buttonStyles.push(styles.buttonAccentBlue);
        textStyles.push(styles.textSecondary);
    }

    // Return the button element created using TouchableOpacity wrapper that responds when pressed.(dimming effect)
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles}>
            <Text style={textStyles}>{text}</Text>
        </TouchableOpacity>
    );
};


// set dimmenstion
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4; // The button width is set as one-fourth of the screen width.

// Define the styles for buttons and texts.
const styles = StyleSheet.create({
    // base style for buttons
    button: {
        backgroundColor: myColors.primary,
        flex: 1,
        height: Math.floor(buttonWidth - 10),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Math.floor(buttonWidth),
        margin: 5,
    },

    // primary text style
    textPrimary: {
        color: myColors.textPrimary,
        fontSize: 32,
    },

    // secondary text style
    textSecondary: {
        color: myColors.textSecondary,
        fontSize: 32,
    },

    // other button styles
    buttonPrimary: {
        backgroundColor: myColors.primary,
    },
    buttonSecondary: {
        backgroundColor: myColors.secondary,
    },
    buttonAccentBlue: {
        backgroundColor: myColors.accentBlue,
    },
    buttonAccentGreen: {
        backgroundColor: myColors.accentGreen,
    },
});