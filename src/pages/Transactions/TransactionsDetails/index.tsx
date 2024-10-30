import { useRoute } from "@react-navigation/native";
import React from "react";
import { Margin } from "../../../components/Margin";
import { ITransactions } from "../../../interface";
import { Card, Container, Text, TextBold } from "./styles";

export const TransactionsDetails: React.FunctionComponent = () => {
    const route = useRoute();
    const data = route?.params as ITransactions;
    const val = data?.value;

    return (
        <Container>
            <Margin size={24} />

            <Text style={{ marginBottom: 8, fontSize: 16 }}>Detalhes:</Text>

            <Card>
                <TextBold>{data?.type}</TextBold>
                <Text>{data?.participant}</Text>

                <Margin size={16} />

                <Text>Valor</Text>
                <TextBold>
                    R$
                    {val.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </TextBold>
            </Card>

            <Margin size={24} />

            <Text style={{ marginBottom: 8, fontSize: 16 }}>Resumo:</Text>
            <Card>
                <Text>Saldo em conta após a transação</Text>
                <TextBold>
                    R$
                    {data.balance.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </TextBold>

                <Margin size={16} />

                <Text>Data</Text>
                <TextBold>{data.date}</TextBold>
            </Card>
        </Container>
    );
};
