import React from "react";
import { View } from "react-native";

interface IProps {
    size: number;
}

export const Margin: React.FunctionComponent<IProps> = ({ size }) => {
    return <View style={{ marginBottom: size }} />;
};
