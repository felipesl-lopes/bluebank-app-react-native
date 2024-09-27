import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background1};
`;

export const Text = styled.Text`
    font-size: 18px;
    text-align: center;
`;

export const Background = styled.ImageBackground`
    flex: 1;
`;

export const Scroll = styled.ScrollView`
    flex: 1;
    padding: 0 12px;
`;

export const Icon = styled(Ionicons)`
    font-size: 130px;
    align-self: center;
    color: black;
`;
