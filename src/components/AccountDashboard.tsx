import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import { AuthContext } from "../contexts/auth";
import { getBalance } from "../functions/getBalance";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

export const AccountDashboard: React.FunctionComponent = () => {
    const [visibleBalance, setVisibleBalance] = useState(false);
    const [balance, setBalance] = useState<number>(0);
    const { user } = useContext(AuthContext);
    const { navigate } = useNavigation<IScreenNavigation>();

    const handlevisibleBalance = () => {
        setVisibleBalance(current => !current);
    };

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, [user.uid]);

    return (
        <Container style={{ elevation: 2 }}>
            <Background
                source={require("../assets/background/background-app/background-card.png")}
                resizeMode="cover"
            >
                <Overlay>
                    <IconVisible
                        onPress={handlevisibleBalance}
                        name={visibleBalance ? "eye" : "eye-slash"}
                    />
                    <Text>{user && user.name}</Text>

                    <Text>1234 ********-1</Text>

                    <Line />

                    <TextBalance>
                        R$
                        {visibleBalance
                            ? balance.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                              })
                            : " **"}
                    </TextBalance>

                    <Transactions onPress={() => navigate("Transacoes")}>
                        Ver transações
                    </Transactions>
                </Overlay>
            </Background>
        </Container>
    );
};

const Container = styled.View`
    width: 100%;
    height: 180px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${theme.colors.primary};
`;

const Background = styled.ImageBackground`
    flex: 1;
    justify-content: center;
`;

const Overlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 205, 0.5);
    padding: 14px;
`;

const Line = styled.View`
    padding: 0.2px;
    width: 100%;
    background-color: ${theme.colors.background2};
    margin: 8px 0;
`;

const Text = styled.Text`
    font-size: 19px;
    color: ${theme.colors.white};
`;

const TextBalance = styled.Text`
    font-size: 20px;
    color: ${theme.colors.accent};
    font-weight: bold;
    margin-bottom: 6px;
    flex: 1;
`;

const IconVisible = styled(FontAwesome)`
    font-size: 24px;
    position: absolute;
    align-self: flex-end;
    z-index: 2;
    padding: 12px;
    color: ${theme.colors.background2};
`;

const Transactions = styled.Text`
    text-align: right;
    text-decoration: underline;
    font-size: 16px;
    color: ${theme.colors.white};
`;
