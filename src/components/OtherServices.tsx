import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

interface IProps {
    title: string;
    description: string;
    screen: string;
}

export const OtherServices: React.FunctionComponent<IProps> = ({
    title,
    description,
    screen,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <CardButton
            style={{ elevation: 1 }}
            activeOpacity={0.8}
            onPress={() => navigate(screen)}
        >
            <Title>{title}</Title>
            <Description>{description}</Description>
        </CardButton>
    );
};

const CardButton = styled.TouchableOpacity`
    background-color: ${theme.colors.background2};
    border-radius: 10px;
    padding: 10px;
    margin: 0 1px 2px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 500;
    margin-right: 6px;
    color: ${theme.colors.primary};
`;

const Description = styled.Text`
    font-size: 15px;
`;
