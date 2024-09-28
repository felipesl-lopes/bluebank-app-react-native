import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as yup from "yup";
import { InputControl } from "../../../components/InputControl";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { Margin } from "../../../components/Margin";
import { PrimaryButton } from "../../../components/SendButton";
import { TextNavigation } from "../../../components/TextNavigation";
import { AuthContext } from "../../../contexts/auth";
import { IFormResetPassword } from "../../../interface";
import { Container, Scroll, Title } from "../Login/styles";
import { Text } from "./styles";

export const ResetPassword: React.FunctionComponent = () => {
    const { resetPassword } = useContext(AuthContext);
    const [message, setMessage] = useState<string>("");
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await Ionicons.loadFont().then(() => {
                setIsReady(true);
            });
        })();
    }, []);

    const schema = yup.object({
        email: yup
            .string()
            .email("E-mail inválido.")
            .required("Informe seu e-mail."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handlePassword = (data: IFormResetPassword) => {
        resetPassword(data, setMessage);
        reset();
    };

    const cleanMessage = () => {
        setMessage("");
    };

    if (!isReady) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Scroll showsVerticalScrollIndicator={false}>
                <Margin size={16} />

                <Title>Recuperação de senha</Title>

                <Margin size={24} />

                {message ? (
                    <View style={{ alignItems: "center" }}>
                        <Ionicons name="mail-unread-outline" size={44} />
                        <Margin size={4} />
                        <Text>
                            Um e-mail foi enviado para{" "}
                            <Text style={{ fontWeight: "bold", color: "#000" }}>
                                {message}
                            </Text>
                            .
                        </Text>
                        <Margin size={8} />
                        <Text>
                            Caso não receba o e-mail em alguns minutos, não se
                            esqueça de checar a pasta de spam ou lixo
                            eletrônico.
                        </Text>
                        <Margin size={8} />
                    </View>
                ) : (
                    <View>
                        <Text>
                            Digite o e-mail da sua conta e enviaremos um link
                            para você redefinir sua senha.
                        </Text>
                        <Margin size={24} />

                        <InputControl
                            control={control}
                            iconName="mail"
                            name="email"
                            errors={
                                errors.email &&
                                (errors.email?.message as string)
                            }
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                )}

                <Margin size={32} />

                <PrimaryButton
                    onPress={
                        message ? cleanMessage : handleSubmit(handlePassword)
                    }
                    title={message ? "Redefinir novamente" : "Redefinir senha"}
                />

                <Margin size={10} />

                <TextNavigation
                    text="Clique aqui para"
                    textNavigation="fazer login"
                    screen="Login"
                />
            </Scroll>
        </Container>
    );
};
