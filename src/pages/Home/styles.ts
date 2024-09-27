import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background1};
`;

export const Background = styled.ImageBackground`
    flex: 1;
`;

export const Scroll = styled.ScrollView`
    flex: 1;
    padding: 0 12px;
`;
