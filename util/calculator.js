/* IM/2021/001 - Kumarasingha K.A.C. */

import { evaluate, expression, round } from "mathjs";

export const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    expression: "",
};

// helper function to format numbers with thousand separators.
export const formatNumber = (num) => {
    const [integer, decimal] = num.toString().split('.');
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
}

// helper function to check if the last character is an operator. This ensures operators arn't applied consecutively.
const isLastCharOperator = (expression) => {
    return /[+\-*/%!^]$/.test(expression.trim());
};

// handle numerical inputs.
export const handleNumber = (value, state) => {
    // ensure that the calculator's state does not exceed 15 digits
    if (state.currentValue.replace(/\D/g, '').length >= 15) {
        return state;
    }

    // prevent multiple decimal points
    if (value === "." && state.currentValue.includes(".")) {
        return state;
    }

    // Handle the case where the decimal point is the first character
    if (value === "." && state.currentValue === "0") {
        return {
            currentValue: "0.",
            expression: `${state.expression}0.`,
        };
    }

    // Handle appending the decimal point to an existing number
    if (value === ".") {
        return {
            currentValue: `${state.currentValue}${value}`,
            expression: `${state.expression}${value}`,
        };
    }

    // if the current value in the state is 0, set the current value to the input value.
    if (state.currentValue === "0" && state.operator === null) {
        return { currentValue: `${value}`, expression: `${value}` };
    }

    // if the current value is not 0, append the input value to the current value.
    return {
        currentValue: `${state.currentValue}${value}`,
        expression: `${state.expression}${value}`,
    };
};

// remove the last character from the current value and expression.
export const handleBackspace = (state) => {
    if (state.currentValue.length > 1) {
        return {
            currentValue: state.currentValue.slice(0, -1),
            expression: state.expression.slice(0, -1),
        };
    }
    return { currentValue: "0", expression: "" };
};

const handleOperator = (value, state) => {
    // Prevent operator if no valid number is entered
    if (state.currentValue === "0" && state.expression === "") {
        return state;
    }

    // Ensure only one operator is allowed consecutively
    const expression = state.expression.trim();
    if (isLastCharOperator(expression)) {
        return {
            ...state,
            operator: value,
            expression: expression.slice(0, -1) + value, // Replace the last operator
        };
    }

    // Handle square root operator
    if (value === "sqrt") {
        const result = round(Math.sqrt(parseFloat(state.currentValue)), 15);
        return {
            ...state,
            currentValue: `${result}`,
            expression: `${state.expression} sqrt(${state.currentValue})`,
        };
    }

    return {
        ...state,
        operator: value,
        previousValue: state.currentValue,
        currentValue: "0",
        expression: `${state.expression} ${value} `,
    };
};


const handleEqual = (state) => {
    if (state.expression.trim() === "" || isLastCharOperator(state.expression)) {
        return state; // no action if the expression is incomplete
    }

    try {
        let result = evaluate(state.expression);
        // Round the result to 15 decimal places
        result = round(result, 15);

        return {
            currentValue: `${result}`,
            expression: `${result}`,
            operator: null,
            previousValue: null,
        };
    } catch (error) {
        return state;
    }
};

// calculator function
const calculator = (type, value, state) => {
    switch (type) {
        case "number":
            return handleNumber(value, state);
        case "sqrt":
            // handle square root operations directly
            const result = round(Math.sqrt(parseFloat(state.currentValue)), 15);
            return {
                ...state,
                currentValue: `${result}`,
                expression: `sqrt(${state.currentValue})`,
                };
            return state;

        case "pi":
            return {
                currentValue: `${Math.PI}`,
                expression: `${state.expression} ${Math.PI}`,
            };
        case "clear":
            return initialState;
        case "posneg":
            return {
                currentValue: `${parseFloat(state.currentValue) * -1}`,
                expression: `${state.expression} * -1`,
            };
        case "percentage":
            // Only add percentage if it's not duplicating
            if (!isLastCharOperator(state.expression)) {
            return {
                currentValue: `${parseFloat(state.currentValue) * 0.01}`,
                expression: `${state.expression} * 0.01`,
                };
            }
            return state;
        case "operator":
            return handleOperator(value, state);
        case "equal":
            return handleEqual(state);
        case "backspace":
            return handleBackspace(state);
        default:
            return state;
    }
};

export default calculator;