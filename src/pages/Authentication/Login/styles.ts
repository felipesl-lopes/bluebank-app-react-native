import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background2};
`;

export const Title = styled.Text`
    font-size: 20px;
    color: ${theme.colors.black};
    text-align: center;
    font-weight: 500;
`;

export const Scroll = styled.ScrollView`
    width: 100%;
    padding: 0 12px;
`;

export const ViewComponents = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ViewCheckBox = styled.View`
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
`;

export const TextCheck = styled.Text`
    margin-right: 5px;
    font-size: 15px;
`;

export const TextRecoverPassword = styled.Text`
    text-decoration: underline;
    font-size: 15px;
`;

export const ContainerSeparator = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const LineSeparator = styled.View`
    width: 40%;
    padding: 0.5px;
    background-color: gray;
`;

export const TextSeparator = styled.Text`
    font-size: 15px;
    font-weight: 700;
`;

export const ButtonFingerprint = styled.TouchableOpacity`
    border-radius: 8px;
    background-color: ${theme.colors.primary};
    flex-direction: row;
    padding: 8px 16px;
    align-self: center;
    align-items: center;
`;

export const TextFingerprint = styled.Text`
    font-size: 15px;
    color: white;
    margin-right: 10px;
    font-weight: 300;
`;

export const IconFingerprint = styled.Image`
    width: 28px;
    height: 28px;
`;

export const TextNewAccount = styled.Text`
    text-align: center;
    font-size: 16px;
`;
