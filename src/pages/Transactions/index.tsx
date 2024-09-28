import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Margin } from "../../components/Margin";
import { TransactionsList } from "../../components/TransactionsList";
import { AuthContext } from "../../contexts/auth";
import { getBalance } from "../../functions/getBalance";
import { handleTransactions } from "../../functions/handleTransactions";
import theme from "../../global/styles/theme";
import { ITransactions } from "../../interface";
import {
    Body,
    Box,
    Container,
    ContainerList,
    FlatListTransactions,
    HeaderTab,
    IconTab,
    LoadingList,
    NotFound,
    TextBalance,
    TextDate,
    TextValue,
    TitleTab,
} from "./styles";

export const Transacoes: React.FunctionComponent = () => {
    const [balance, setBalance] = useState<number>(0);
    const { user } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { goBack } = useNavigation();

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, [user.uid]);

    useEffect(() => {
        (async () => {
            await handleTransactions(setLoading, user, setTransactions, date);
        })();
    }, [date, user]);

    const openDate = () => {
        setShow(true);
    };

    const closeDate = (event: object, date: Date | undefined) => {
        setShow(false);
        if (date) {
            setDate(date);
        }
    };

    return (
        <Container>
            <HeaderTab style={{ elevation: 10 }}>
                <IconTab
                    onPress={goBack}
                    style={{ marginRight: 30 }}
                    name="arrow-back"
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flex: 1,
                    }}
                >
                    <TitleTab>Transações</TitleTab>
                    <IconTab name="calendar" onPress={openDate} />
                </View>
            </HeaderTab>

            <Body>
                <Margin size={16} />
                <TextBalance>Saldo atual</TextBalance>
                <TextValue>
                    R$
                    {balance.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </TextValue>

                <Margin size={16} />

                <ContainerList>
                    <Box>
                        <TextDate>{date.toLocaleDateString()}</TextDate>
                        <Text>Resultados: {transactions.length}</Text>
                    </Box>

                    {loading ? (
                        <LoadingList
                            color={theme.colors.primary}
                            size={"large"}
                        />
                    ) : (
                        <FlatListTransactions
                            data={transactions}
                            renderItem={({ item }) => (
                                <TransactionsList data={item} />
                            )}
                            ListEmptyComponent={
                                <NotFound>
                                    Nenhuma transação realizada nesta data.
                                </NotFound>
                            }
                        />
                    )}
                </ContainerList>
            </Body>

            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={closeDate}
                />
            )}
        </Container>
    );
};
