import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

interface IProps {
    title: string;
}

export const DrawerButton: React.FunctionComponent<IProps> = ({ title }) => {
    const { dispatch } = useNavigation();

    return (
        <Container style={{ elevation: 10 }}>
            <Icon
                name="menu-sharp"
                onPress={() => dispatch(DrawerActions.toggleDrawer())}
            />
            <Title>{title}</Title>
        </Container>
    );
};

const Container = styled.View`
    background-color: ${theme.colors.primary};
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

const Icon = styled(Ionicons)`
    font-size: 25px;
    color: ${theme.colors.white};
`;

const Title = styled.Text`
    font-size: 20px;
    color: ${theme.colors.white};
    margin-left: 30px;
    font-weight: bold;
`;
