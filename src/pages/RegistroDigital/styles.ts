import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background1};
`;

export const Scroll = styled.ScrollView`
    padding: 0 12px;
`;

export const Img = styled.Image`
    width: 80px;
    height: 80px;
    align-self: center;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: center;
    color: ${theme.colors.black};
`;

export const Text = styled.Text`
    font-size: 18px;
    text-align: center;
`;
