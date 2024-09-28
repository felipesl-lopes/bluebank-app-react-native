import React from "react";
import { Dimensions, Image } from "react-native";

export const ImageHeader: React.FunctionComponent = () => {
    const { width: screenWidth } = Dimensions.get("window");

    return (
        <Image
            style={{
                width: screenWidth,
                height: undefined,
                aspectRatio: 2,
            }}
            source={require("../assets/background/background-autentication/background.png")}
        />
    );
};
