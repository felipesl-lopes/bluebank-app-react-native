import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import * as Keychain from "react-native-keychain";
import { Margin } from "../../components/Margin";
import { ModalPasswordConfirm } from "../../components/ModalPasswordConfirm";
import { PrimaryButton, SecondaryButton } from "../../components/SendButton";
import { AuthContext } from "../../contexts/auth";
import { Container, Img, Scroll, Text, Title } from "./styles";

export const Biometry: React.FunctionComponent = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { goBack } = useNavigation();

    const { user, setLoading } = useContext(AuthContext);
    const [show, setShow] = useState<boolean>(false);

    const getRegisterBiometry = async () => {
        await rnBiometrics
            .simplePrompt({
                promptMessage:
                    "Confirme sua impressão digital para realizar o cadastro",
                cancelButtonText: "Cancelar",
            })
            .then(async resultObject => {
                const { success } = resultObject;
                if (success) {
                    setShow(true);
                }
            })
            .catch(() => {
                Alert.alert("Falha na autenticação biométrica");
            });
    };

    const handleFunction = async (password: string) => {
        setLoading(true);
        await Keychain.setGenericPassword(user.email, password)
            .then(() => {
                Alert.alert("Biometria cadastrada");
                goBack();
            })
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <Container>
            <Scroll>
                <Margin size={32} />

                <Title>Cadastre sua Biometria</Title>

                <Margin size={24} />

                <Img source={require("../../assets/biometry.png")} />

                <Margin size={36} />

                <Text>
                    Use sua digital para um acesso mais rápido e seguro.
                </Text>

                <Margin size={32} />

                <PrimaryButton
                    title="Continuar"
                    onPress={getRegisterBiometry}
                />

                <Margin size={8} />

                <SecondaryButton title="Voltar" onPress={() => goBack()} />

                <ModalPasswordConfirm
                    setShow={setShow}
                    show={show}
                    handleFunction={handleFunction}
                />
            </Scroll>
        </Container>
    );
};
