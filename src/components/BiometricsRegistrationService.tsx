import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { getHaveBiometrics } from "../functions/getHaveBiometrics";
import { getSuportedBiometry } from "../functions/getSuportedBiometry";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

export const BiometricsRegistrationService: React.FunctionComponent = () => {
    const { navigate } = useNavigation<IScreenNavigation>();

    const [isBiometry, setIsBiometry] = useState<boolean>(false);
    const [suportedBiometry, setSuportedBiometry] = useState<boolean>();

    useEffect(() => {
        (async () => {
            await getHaveBiometrics(setIsBiometry);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getSuportedBiometry(setSuportedBiometry);
        })();
    }, [setSuportedBiometry]);

    return (
        !suportedBiometry ||
        (!isBiometry && (
            <Container
                onPress={() => navigate("Biometry")}
                activeOpacity={0.8}
                style={{ elevation: 2 }}
            >
                <Background
                    source={require("../assets/background/background-app/backgroun-biometry.png")}
                >
                    <Overlay>
                        <ContainerText>
                            <Title>Cadastre sua Biometria</Title>
                            <Text>
                                Facilite o acesso e aumente a segurança do seu
                                app.
                            </Text>
                        </ContainerText>
                        <Image source={require("../assets/biome.png")} />
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
    padding: 10px 20px;
    border-radius: 10px;
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
