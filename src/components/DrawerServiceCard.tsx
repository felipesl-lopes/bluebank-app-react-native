import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import { IScreenNavigation } from "../interface";

interface IProps {
    screen: string;
    title: string;
    source: ImageSourcePropType;
}

export const DrawerServiceCard: React.FunctionComponent<IProps> = ({
    screen,
    title,
    source,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <ContainerServices activeOpacity={0.7} onPress={() => navigate(screen)}>
            <ImgService source={source} />
            <TextService>{title}</TextService>
        </ContainerServices>
    );
};

const ContainerServices = styled.TouchableOpacity`
    align-items: center;
    padding: 4px;
    margin: 5px 0;
    flex-direction: row;
`;

const TextService = styled.Text`
    font-size: 15px;
    margin-left: 16px;
`;

const ImgService = styled.Image`
    width: 26px;
    height: 26px;
`;
