/* IM/2021/001 - Kumarasingha K.A.C. */

import { StyleSheet, View } from "react-native";

// 'Row' component is a functional component that takes a signle property 'children'
// nested 'children' components will be displayed inside the 'Row' component.
// 'View' act as a container for the 'children' components. 
const Row = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

// define styles of Row
const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // Child components are arranged horizontally from left to right.
    },
});

export default Row;