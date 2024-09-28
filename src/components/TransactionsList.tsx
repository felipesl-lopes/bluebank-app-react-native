import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { ITransactions } from "../interface";

interface IProps {
    data: ITransactions;
}

interface IScreenNavigationProps {
    navigate: (screen: string, params?: ITransactions) => void;
}

export const TransactionsList: React.FunctionComponent<IProps> = ({ data }) => {
    const { navigate } = useNavigation<IScreenNavigationProps>();

    return (
        <Container
            style={{ elevation: 1 }}
            activeOpacity={0.7}
            onPress={() => navigate("TransactionsDetails", data)}
        >
            <Box>
                <TextStrong>{data.type}</TextStrong>

                <Text style={{ fontSize: 16 }}>
                    R$
                    {data.balance.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </Text>
            </Box>

            <Box>
                <Text>{data.date.slice(0, 10)}</Text>
                <TextStrong
                    style={{ color: data.debit ? "#ac0000" : "#00ac00" }}
                >
                    {data.debit ? "-" : "+"}R$
                    {data.value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </TextStrong>
            </Box>
        </Container>
    );
};

const Container = styled.TouchableOpacity`
    margin: 0 10px 10px;
    padding: 10px;
    background-color: ${theme.colors.background2};
    border-radius: 8px;
`;

const TextStrong = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: ${theme.colors.black};
`;

const Box = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
