import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { checkIfFingerprintExists } from "../functions/checkIfFingerprintExists";
import { checkIfFingerprintSupported } from "../functions/checkIfFingerprintSupported";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

export const FingerprintRegistrationService: React.FunctionComponent = () => {
    const { navigate } = useNavigation<IScreenNavigation>();

    const [fingerprintExists, setFingerprintExists] = useState<boolean>(false);
    const [supportedFingerprint, setSupportedFingerprint] = useState<boolean>();

    useEffect(() => {
        (async () => {
            await checkIfFingerprintExists(setFingerprintExists);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await checkIfFingerprintSupported(setSupportedFingerprint);
        })();
    }, [setSupportedFingerprint]);

    return (
        !supportedFingerprint ||
        (!fingerprintExists && (
            <Container
                onPress={() => navigate("Fingerprint")}
                activeOpacity={0.8}
                style={{ elevation: 2 }}
            >
                <Background
                    source={require("../assets/background/background-app/background-fingerprint.png")}
                >
                    <Overlay>
                        <ContainerText>
                            <Title>Cadastre sua Digital</Title>
                            <Text>
                                Facilite o acesso e aumente a segurança do seu
                                app.
                            </Text>
                        </ContainerText>
                        <Image
                            source={require("../assets/fingerprint-register.png")}
                        />
                    </Overlay>
                </Background>
            </Container>
        ))
    );
};

const Container = styled.TouchableOpacity`
    border-radius: 10px;
    margin: 0 10px 20px;
    overflow: hidden;
`;

const Background = styled.ImageBackground`
    flex: 1;
    border-radius: 10px;
`;

const Overlay = styled.View`
    background-color: rgba(102, 163, 255, 0.6);
    flex: 1;
    flex-direction: row;
    padding: 10px 14px;
    border-radius: 10px;
    align-items: center;
`;

const ContainerText = styled.View`
    flex: 1;
    margin-right: 12px;
`;

const Title = styled.Text`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 2px;
    color: ${theme.colors.accent};
`;

const Text = styled.Text`
    color: ${theme.colors.background2};
    font-size: 15px;
`;

const Image = styled.Image`
    width: 68px;
    height: 68px;
`;
