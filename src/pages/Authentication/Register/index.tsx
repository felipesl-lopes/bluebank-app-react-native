import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as yup from "yup";
import {
    InputControl,
    InputPasswordControl,
} from "../../../components/InputControl";
import { LoadingModal } from "../../../components/LoadingModal";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { Logo_name_white } from "../../../components/Logo";
import { Margin } from "../../../components/Margin";
import { PrimaryButton, SecondaryButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import { IFormRegister } from "../../../interface";
import {
    Container,
    Scroll,
    ViewLogo,
    ViewOpacity,
    Wallpaper,
} from "../Login/styles";

export const Register: React.FunctionComponent = () => {
    const { signUp } = useContext(AuthContext);
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
        name: yup.string().required("Informe seu nome completo."),
        cpf: yup
            .string()
            .min(11, "Mínimo de 11 dígitos")
            .required("Digite seu CPF."),
        password: yup
            .string()
            .min(6, "Mínimo de 6 dígitos.")
            .required("Digite a sua senha."),
        confirmPassword: yup
            .string()
            .required("Repita a senha.")
            .oneOf([yup.ref("password")], "Confirmação incorreta."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = (data: IFormRegister) => {
        signUp(data);
    };

    if (!isReady) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Wallpaper
                source={require("../../../assets/Background/background.jpg")}
            >
                <ViewOpacity>
                    <ViewLogo>
                        <Logo_name_white scale={3} />
                    </ViewLogo>

                    <Scroll showsVerticalScrollIndicator={false}>
                        <InputControl
                            iconName="person"
                            placeholder="Nome completo"
                            autoCapitalize="words"
                            control={control}
                            name="name"
                            errors={
                                errors.name && (errors.name?.message as string)
                            }
                        />

                        <InputControl
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            control={control}
                            name="email"
                            errors={
                                errors.email &&
                                (errors.email?.message as string)
                            }
                        />

                        <InputControl
                            iconName="card"
                            placeholder="CPF"
                            keyboardType="numeric"
                            maxLength={11}
                            control={control}
                            name="cpf"
                            errors={
                                errors.cpf && (errors.cpf?.message as string)
                            }
                        />

                        <InputPasswordControl
                            placeholder="Senha"
                            autoCapitalize="none"
                            control={control}
                            name="password"
                            errors={
                                errors.password &&
                                (errors.password?.message as string)
                            }
                        />

                        <InputPasswordControl
                            placeholder="Confirmar senha"
                            autoCapitalize="none"
                            control={control}
                            name="confirmPassword"
                            errors={
                                errors.confirmPassword &&
                                (errors.confirmPassword?.message as string)
                            }
                        />

                        <Margin pixels={32} />

                        <PrimaryButton
                            title="CRIAR CONTA"
                            onPress={handleSubmit(handleRegister)}
                        />

                        <Margin pixels={8} />

                        <SecondaryButton title="ENTRAR" screen={"Login"} />
                    </Scroll>
                </ViewOpacity>
            </Wallpaper>
            <LoadingModal />
        </Container>
    );
};
