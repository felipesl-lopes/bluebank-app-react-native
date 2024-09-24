import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background};
`;

export const Wallpaper = styled.ImageBackground`
    flex: 1;
    width: 100%;
`;

export const ViewOpacity = styled.View`
    background-color: rgba(240, 245, 255, 0.85);
    flex: 1;
`;

export const ViewLogo = styled.View`
    align-items: center;
    padding: 10px 0;
    background-color: ${theme.colors.primary};
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    margin-bottom: 30px;
`;

export const Scroll = styled.ScrollView`
    width: 100%;
    padding: 0 20px;
`;

export const ViewComponents = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 12px 0 0;
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
    text-align: center;
    text-decoration: underline;
    font-weight: 500;
    font-size: 15px;
`;

export const ContainerSeparator = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 60px 0;
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

export const ButtonBiometry = styled.TouchableOpacity`
    border-radius: 8px;
    background-color: ${theme.colors.background};
    flex-direction: row;
    padding: 6px 8px;
    align-self: center;
    justify-content: space-between;
    margin: 10px;
`;

export const TextBiometry = styled.Text`
    font-size: 16px;
    color: black;
    margin-right: 12px;
`;

export const IconBiometry = styled.Image`
    width: 36px;
    height: 36px;
`;
