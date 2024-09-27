import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

interface IPropsButton extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
}

export const PrimaryButton: React.FunctionComponent<IPropsButton> = ({
    title,
    onPress,
    ...otherProps
}) => {
    return (
        <ButtonPrimary onPress={onPress} activeOpacity={0.7} {...otherProps}>
            <TextButton>{title}</TextButton>
        </ButtonPrimary>
    );
};

export const SecondaryButton: React.FunctionComponent<IPropsButton> = ({
    title,
    onPress,
    ...otherProps
}) => {
    return (
        <ButtonSecundary onPress={onPress} activeOpacity={0.7} {...otherProps}>
            <TextButton style={{ color: theme.colors.primary }}>
                {title}
            </TextButton>
        </ButtonSecundary>
    );
};

const ButtonPrimary = styled.TouchableOpacity`
    background-color: ${theme.colors.primary};
    border-radius: 8px;
    height: 48px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const ButtonSecundary = styled.TouchableOpacity`
    border-radius: 8px;
    height: 48px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    border-width: 2px;
    border-color: ${theme.colors.primary};
`;

const TextButton = styled.Text`
    font-weight: 600;
    color: ${theme.colors.white};
    text-align: center;
    font-size: 16px;
`;
