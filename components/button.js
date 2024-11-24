/* IM/2021/001 - Kumarasingha K.A.C. */

// useRef is used to store a variable reference to a value.
import React, { useRef } from "react";
// Dimentions used to access the screen width and height which helps in calculating responsive layouts.
// StyleSheet define and manage styles.
// Text is used to render text in the app.
// TouchableOpacity is a wrapper which gives visual feedback when tapped on an element.
// Animated is used to create animations.
// Easing is used to define the speed of the animation.
import { Dimensions, StyleSheet, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { myColors } from "../styles/colors";
import { Icons } from "./icons";

// Three properties are defined that are needed to make the button component.
    // 'onPress' is a function that is called when the button is pressed.
    // 'text' is the label that is displayed on the button.
    // 'theme' is used to change the button's appearance. 
    // 'iconName' is used to display the relevent icon on the button.
const Button = ({ onPress, text, theme, iconName }) => {
    // useRef is used to store the reference of the animated value.
    // Animated.Value is initialized to half of the button's width.
    const borderRadius = useRef(new Animated.Value(buttonWidth / 2)).current;
    
    /* animation for the button when pressed: when pressed, border radius changes to a quaeter of the button width over 200 milliseconds
    with a linear easing function. The animation is run on the native thread for better performance. */
    const handlePressIn = () => {
        Animated.timing(borderRadius, {
            toValue: buttonWidth / 4,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    // animation for the button when released: when released, border radius changes back to the original shape.
    const handlePressOut = () => {
        Animated.timing(borderRadius, {
            toValue: buttonWidth / 2,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };
    
    /* These arrays collect base styles and dynamically append additional styles to the button and text based on the properties
    to change their appearance in real-time. */
    const buttonStyles = [styles.button, { borderRadius }];
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
    } else if (theme === "extra") {
        buttonStyles.push(styles.buttonExtra);
        textStyles.push(styles.textPrimary);
    }

    // Return the button element created using TouchableOpacity wrapper that responds when pressed.(dimming effect)
    return (
        <TouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={buttonStyles}
            activeOpacity={0.6}>
            
            {iconName ? <Icons name={iconName} /> : <Text style={textStyles}>{text}</Text>}

        </TouchableOpacity>
    );
};


// set dimmenstion
const screen = Dimensions.get("window"); // Get the screen dimensions.
const buttonWidth = screen.width / 4; // The button width is set as one-fourth of the screen width.

// Define the styles for buttons and texts.
const styles = StyleSheet.create({
    // base style for buttons
    button: {
        backgroundColor: myColors.primary,
        flex: 1,    // this property defines how the button elements are going to fill over the availale space.(space will be devided according to the flex value)
        height: Math.floor(buttonWidth - 10),   // set the height of the button to be slightly less that the width value to ensure perfect circle.
                                                //  heigth is 10 units less than the width because of the margin of 5.
                                                // floor returns the nearest integer that is less than or equal to the real number.
        alignItems: "center",   // center the content of the button horizontally.
        justifyContent: "center",   // center the content of the button vertically.
        borderRadius: Math.floor(buttonWidth / 2),  // set the border radius of the button to the half of the width ensuring rounded corners.
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
    buttonExtra: {
        backgroundColor: myColors.extra,
        height: Math.floor(buttonWidth / 2),
    },
});

export default Button;