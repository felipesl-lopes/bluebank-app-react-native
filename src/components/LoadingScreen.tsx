import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

export const LoadingScreen: React.FunctionComponent = () => {
    return (
        <Container>
            <Logo
                source={require("../assets/Logo/logo_name-blue.png")}
                resizeMode="contain"
            />
        </Container>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background2};
    align-items: center;
    justify-content: center;
`;

const Logo = styled.Image`
    width: 50%;
    height: auto;
    aspect-ratio: 3;
`;
