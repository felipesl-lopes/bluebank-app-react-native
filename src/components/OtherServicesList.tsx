import React from "react";
import { ScrollView } from "react-native";
import { OtherServices } from "./OtherServices";
import theme from "../global/styles/theme";
import { Margin } from "./Margin";

export const OtherServicesList: React.FunctionComponent = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                padding: 10,
                backgroundColor: theme.colors.white,
                borderRadius: 10,
            }}
        >
            <OtherServices
                title="Negociar dívidas"
                description="Negocie suas dívidas e encontre opções de pagamento flexíveis."
                screen="Negociacao"
            />

            <Margin size={10} />

            <OtherServices
                title="Precisa de ajuda?"
                description="Entre em contato conosco e tire as suas dúvidas."
                screen="Ajuda"
            />

            <Margin size={10} />

            <OtherServices
                title="Contrato"
                description="Leia os termos de contrato aqui."
                screen="Contrato"
            />
        </ScrollView>
    );
};
