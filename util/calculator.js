/* IM/2021/001 - Kumarasingha K.A.C. */

export const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
};

// handle numerical inputs.
export const handleNumber = (value, state) => {
    // if the current value in the state is 0, set the current value to the input value.
    if (state.currentValue === "0") {
        return { currentValue: `${value}` };
    }

    // if the current value is not 0, append the input value to the current value.
    return {
        currentValue: `${state.currentValue}${value}`,
    };
};

const handleEqual = (state) => {
    const { currentValue, previousValue, operator } = state;

    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    const resetState = { operator: null, previousValue: null };

    switch (operator) {
        case "+":
            return {
                currentValue: `${previous + current}`,
                ...resetState,
            };
        case "-":
            return {
                currentValue: `${previous - current}`,
                ...resetState,
            };
        case "*":
            return {
                currentValue: `${previous * current}`,
                ...resetState,
            };
        case "/":
            return {
                currentValue: `${previous / current}`,
                ...resetState,
            };

        default:
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
            };
        case "percentage":
            return {
                currentValue: `${parseFloat(state.currentValue) * 0.01}`,
            };
        case "operator":
            return {
                operator: value,
                previousValue: state.currentValue,
                currentValue: "0",
            };
        case "equal":
            return handleEqual(state);
        default:
            return state;
    }
};

export default calculator;