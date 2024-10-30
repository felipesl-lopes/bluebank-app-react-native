import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { IScreenNavigation } from "../../interface";
import { DrawerServiceCard } from "../DrawerServiceCard";
import { Margin } from "../Margin";
import {
    Container,
    ContainerCash,
    ContainerLine,
    ContainerLogout,
    HeaderProfile,
    IconCash,
    IconLogout,
    IconProfile,
    TextLogout,
    TextMail,
    TextName,
    TextType,
} from "./styles";

export const CustomDrawer: React.FunctionComponent<
    DrawerContentComponentProps
> = () => {
    const { navigate } = useNavigation<IScreenNavigation>();
    const { logOut, user } = useContext(AuthContext);

    return (
        <Container>
            <Margin size={12} />

            <HeaderProfile
                activeOpacity={0.7}
                onPress={() => navigate("Profile")}
            >
                <View>
                    <TextName>{user.name}</TextName>
                    <TextMail>{user.email}</TextMail>
                </View>
                <IconProfile name="person" />
            </HeaderProfile>

            <Margin size={12} />

            <ContainerLine />

            <DrawerContentScrollView showsVerticalScrollIndicator={false}>
                <Margin size={8} />

                <TextType>Operações</TextType>

                <Margin size={4} />

                <DrawerServiceCard
                    screen="Transacoes"
                    title="Transação"
                    source={require("../../assets/IconsService/transacao.png")}
                />

                <DrawerServiceCard
                    screen="Cartao"
                    title="Cartão"
                    source={require("../../assets/IconsService/cartao.png")}
                />

                <DrawerServiceCard
                    screen="Fatura"
                    title="Fatura"
                    source={require("../../assets/IconsService/fatura.png")}
                />

                <DrawerServiceCard
                    screen="Recarga"
                    title="Recarga"
                    source={require("../../assets/IconsService/recarga.png")}
                />

                <DrawerServiceCard
                    screen="Pix"
                    title="Pix"
                    source={require("../../assets/IconsService/pix.png")}
                />

                <DrawerServiceCard
                    screen="Boleto"
                    title="Boleto"
                    source={require("../../assets/IconsService/boleto.png")}
                />

                <DrawerServiceCard
                    screen="Transferencia"
                    title="Transferência"
                    source={require("../../assets/IconsService/transferencia.png")}
                />

                <DrawerServiceCard
                    screen="Poupanca"
                    title="Poupança"
                    source={require("../../assets/IconsService/poupanca.png")}
                />

                <DrawerServiceCard
                    screen="Investimento"
                    title="Investimento"
                    source={require("../../assets/IconsService/investimento.png")}
                />

                <ContainerLine />

                <Margin size={8} />

                <TextType>Assistência</TextType>

                <Margin size={4} />

                <DrawerServiceCard
                    screen="Negociacao"
                    title="Negociar dívidas"
                    source={require("../../assets/IconsService/negociacao.png")}
                />

                <DrawerServiceCard
                    screen="Ajuda"
                    title="Ajuda"
                    source={require("../../assets/IconsService/ajuda.png")}
                />

                <DrawerServiceCard
                    screen="Contrato"
                    title="Contrato"
                    source={require("../../assets/IconsService/contrato.png")}
                />

                <ContainerLine />

                <Margin size={16} />

                <ContainerCash
                    onPress={() => navigate("CashSimulationRoutes")}
                    activeOpacity={0.8}
                >
                    <IconCash
                        source={require("../../assets/IconsService/atm.png")}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 15 }}>Caixa Eletrônico</Text>
                </ContainerCash>

                <Margin size={16} />
            </DrawerContentScrollView>

            <ContainerLogout onPress={logOut}>
                <TextLogout>Sair</TextLogout>
                <IconLogout name="log-out-outline" />
            </ContainerLogout>
        </Container>
    );
};
