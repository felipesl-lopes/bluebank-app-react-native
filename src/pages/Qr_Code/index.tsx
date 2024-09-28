import React from "react";
import { HeaderDrawer_2 } from "../../components/HeaderDrawer";
import { Margin } from "../../components/Margin";
import { PrimaryButton, SecondaryButton } from "../../components/SendButton";
import { Container, Icon, Scroll, Text } from "./styles";

export const Qr_Code: React.FunctionComponent = () => {
    return (
        <Container>
            <HeaderDrawer_2 title="QR Code" />

            <Scroll>
                <Margin size={32} />

                <Text>
                    Selecione uma das opções abaixo para realizar uma ação com
                    QR Code.
                </Text>

                <Margin size={24} />

                <Icon name="qr-code-sharp" color={undefined} />

                <Margin size={36} />

                <PrimaryButton onPress={() => {}} title="Pagar com QR Code" />

                <Margin size={8} />

                <SecondaryButton onPress={() => {}} title="Gerar QR Code" />

                <Margin size={24} />

                <Text style={{ fontSize: 16 }}>
                    Certifique-se de escanear apenas códigos de fontes
                    confiáveis.
                </Text>
            </Scroll>
        </Container>
    );
};
