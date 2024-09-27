import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.background1};
    padding: 0 10px;
`;

export const HeaderProfile = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const IconProfile = styled(Ionicons)`
    font-size: 20px;
`;

export const ContainerLine = styled.View`
    padding: 0.5px;
    width: 100%;
    background-color: ${theme.colors.gray};
`;

export const TextType = styled.Text``;

export const ContainerCash = styled.TouchableOpacity`
    background-color: ${theme.colors.white};
    align-items: center;
    border-radius: 8px;
    align-self: center;
    padding: 2px 10px;
`;

export const IconCash = styled.Image`
    height: 30px;
    width: 30px;
    align-self: center;
    margin: 3px;
`;

export const TextService = styled.Text`
    font-size: 16px;
    color: white;
    margin-top: 5px;
    text-align: center;
`;

export const TextName = styled.Text`
    font-size: 18px;
    color: black;
    font-weight: bold;
`;

export const TextMail = styled.Text``;

export const ContainerLogout = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 4px;
    align-self: flex-end;
`;

export const TextLogout = styled.Text`
    font-size: 19px;
`;

export const IconLogout = styled(Ionicons)`
    font-size: 24px;
    margin-left: 10px;
`;
