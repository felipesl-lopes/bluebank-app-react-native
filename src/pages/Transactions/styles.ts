import { FlatList, FlatListProps } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";
import { ITransactions } from "../../interface";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background1};
`;

export const HeaderTab = styled.View`
    background-color: ${theme.colors.primary};
    padding: 14px 18px;
    flex-direction: row;
`;

export const IconTab = styled(Ionicons)`
    color: ${theme.colors.white};
    font-size: 25px;
`;

export const TitleTab = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: ${theme.colors.white};
`;

export const TextBalance = styled.Text`
    font-size: 16px;
`;

export const TextValue = styled.Text`
    font-size: 20px;
    color: ${theme.colors.primary};
    font-weight: bold;
`;

export const Body = styled.View`
    flex: 1;
    padding: 0 12px;
`;

export const ContainerList = styled.View`
    margin: 0 30px 30px;
    align-self: center;
    height: 80%;
    width: 100%;
    border-radius: 10px;
    background-color: ${theme.colors.white};
`;

export const Box = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 8px;
    border-bottom-width: 1px;
    border-color: ${theme.colors.gray};
    padding-bottom: 4px;
`;

export const TextDate = styled.Text`
    font-weight: 500;
    color: ${theme.colors.text};
    font-size: 16px;
`;

export const LoadingList = styled.ActivityIndicator`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const FlatListTransactions = styled(
    FlatList as new (
        props: FlatListProps<ITransactions>,
    ) => FlatList<ITransactions>,
)`
    padding-top: 10px;
`;

export const NotFound = styled.Text`
    font-size: 16px;
    font-style: italic;
    text-align: center;
    margin-top: 20%;
`;
