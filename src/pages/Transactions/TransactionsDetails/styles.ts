import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background1};
    padding: 0 12px;
`;

export const Card = styled.View`
    background-color: ${theme.colors.white};
    border-radius: 10px;
    padding: 10px;
`;

export const TextBold = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${theme.colors.black};
`;

export const Text = styled.Text`
    font-size: 15px;
`;
