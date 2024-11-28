/* IM/2021/001 - Kumarasingha K.A.C. */

import { evaluate } from "mathjs";

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

// handle numerical inputs.
export const handleNumber = (value, state) => {
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

export const handleBackspace = (state) => {
    if (state.currentValue.length > 1) {
        return {
            currentValue: state.currentValue.slice(0, -1),
            expression: state.expression.slice(0, -1),
        };
    }
    return { currentValue: "0", expression: "" };
};

const handleEqual = (state) => {
    try {
        if (/\/ 0($|\D)/.test(state.expression)) {
            return {
                currentValue: "Can't divide by 0",
                expression: "Can't divide by 0",
                operator: null,
                previousValue: null,
                result: "",
            };
        }
        const result = evaluate(state.expression);
        return {
            currentValue: `${result}`,
            expression: `${result}`,
            operator: null,
            previousValue: null,
            result: "", 
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
        case "clear":
            return initialState;
        case "posneg":
            return {
                currentValue: `${parseFloat(state.currentValue) * -1}`,
                expression: `${state.expression} * -1`,
            };
        case "percentage":
            return {
                currentValue: `${parseFloat(state.currentValue) * 0.01}`,
                expression: `${state.expression} * 0.01`,
            };
        case "operator":
            return {
                operator: value,
                previousValue: state.currentValue,
                currentValue: state.currentValue,
                expression: `${state.expression} ${value} `,
            };
        case "equal":
            return handleEqual(state);
        case "backspace":
            return handleBackspace(state);
        default:
            return state;
    }
};

export default calculator;