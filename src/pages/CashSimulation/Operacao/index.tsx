import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { LoadingModal } from "../../../components/LoadingModal";
import { AuthContext } from "../../../contexts/auth";
import { handleDeposit } from "../../../functions/handleDeposit";
import { handleWithdraw } from "../../../functions/handleWithdraw";
import {
    Button,
    Container,
    Input,
    TextButton,
    TextOperation,
    ViewButtons,
    ViewIcons,
} from "./styles";

type OperacaoRouteProp = RouteProp<{ Operacao: { type: string } }, "Operacao">;

export const Operacao: React.FunctionComponent = () => {
    const { goBack } = useNavigation();
    const [value, setValue] = useState<string>("");
    const { user, setUser, setLoading } = useContext(AuthContext);
    const route = useRoute<OperacaoRouteProp>();
    const { type } = route.params;

    const confirm = async () => {
        const val = parseFloat(value);
        setLoading(false);

        if (type == "SAQUE") {
            await handleWithdraw(user, setUser, val, setLoading, goBack);
        }
        if (type == "DEPÓSITO") {
            await handleDeposit(user, setUser, val, setLoading, goBack);
        }
    };

    const clear = () => {
        setValue("");
    };

    const cancel = () => {
        setValue("");
        goBack();
    };

    return (
        <Container>
            <TextOperation>{type}</TextOperation>
            <ViewIcons>
                <Input
                    value={value}
                    onChangeText={setValue}
                    maxLength={4}
                    keyboardType="numeric"
                />

                <ViewButtons>
                    <Button
                        onPress={confirm}
                        activeOpacity={0.8}
                        style={{ backgroundColor: "green", elevation: 4 }}
                        disabled={!value}
                    >
                        <TextButton>CONFIRMAR</TextButton>
                    </Button>

                    <Button
                        activeOpacity={0.8}
                        onPress={clear}
                        style={{ backgroundColor: "yellow", elevation: 4 }}
                        disabled={!value}
                    >
                        <TextButton>LIMPAR</TextButton>
                    </Button>

                    <Button
                        activeOpacity={0.8}
                        onPress={cancel}
                        style={{ backgroundColor: "red", elevation: 4 }}
                    >
                        <TextButton>CANCELAR</TextButton>
                    </Button>
                </ViewButtons>
            </ViewIcons>
            <LoadingModal />
        </Container>
    );
};
