import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { IScreenNavigation } from "../interface";

interface IProps {
    text: string;
    textNavigation: string;
    screen: string;
}

export const TextNavigation: React.FunctionComponent<IProps> = ({
    text,
    textNavigation,
    screen,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <Text>
            {text}{" "}
            <TextNav onPress={() => navigate(screen)}>{textNavigation}</TextNav>
            {"."}
        </Text>
    );
};

const Text = styled.Text`
    font-size: 16px;
    text-align: center;
`;

const TextNav = styled.Text`
    color: ${theme.colors.primary};
    font-weight: bold;
`;
