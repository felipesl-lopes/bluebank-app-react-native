import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

interface IProps {
    screen: string;
    source: ImageSourcePropType;
    nameCard: string;
}

export const ServiceCard: React.FunctionComponent<IProps> = ({
    screen,
    source,
    nameCard,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <CardButtons
            style={{ elevation: 1 }}
            onPress={() => navigate(screen)}
            activeOpacity={0.8}
        >
            <IconCard source={source} resizeMode="contain" />
            <NameCard numberOfLines={1}>{nameCard}</NameCard>
        </CardButtons>
    );
};

const CardButtons = styled.TouchableOpacity`
    width: 22%;
    align-items: center;
    background-color: ${theme.colors.background2};
    margin: 2px;
    padding: 6px;
    border-radius: 8px;
    justify-content: center;
`;

const IconCard = styled.Image`
    height: 32px;
    width: 32px;
`;

const NameCard = styled.Text`
    text-align: center;
    margin-top: 6px;
    font-size: 13px;
`;
