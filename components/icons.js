/* IM/2021/001 - Kumarasingha K.A.C. */

import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { myColors } from "../styles/colors";

// Icon component that takes in a name as a prop and renders the icon
export const Icons = ({ name }) => {
    return <Icon name={name} size={32} color={myColors.textSecondary} />;
};