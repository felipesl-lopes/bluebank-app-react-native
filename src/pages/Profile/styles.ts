import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background1};
`;

export const Scroll = styled.ScrollView`
    padding: 0 12px;
`;

export const Title = styled.Text`
    font-size: 18px;
    text-align: center;
    margin: 0 10px;
`;
