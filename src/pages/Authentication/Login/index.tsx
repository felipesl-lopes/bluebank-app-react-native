import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ToggleSwitch from "toggle-switch-react-native";
import * as yup from "yup";
import { ImageHeader } from "../../../components/ImageHeader";
import {
    InputControl,
    InputPasswordControl,
} from "../../../components/InputControl";
import { LoadingModal } from "../../../components/LoadingModal";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { Margin } from "../../../components/Margin";
import { PrimaryButton } from "../../../components/SendButton";
import { TextNavigation } from "../../../components/TextNavigation";
import { AuthContext } from "../../../contexts/auth";
import { getAuthWithFingerprint } from "../../../functions/getAuthWithFingerprint";
import { checkIfFingerprintExists } from "../../../functions/checkIfFingerprintExists";
import { checkIfFingerprintSupported } from "../../../functions/checkIfFingerprintSupported";
import theme from "../../../global/styles/theme";
import { IFormLogin, IScreenNavigation } from "../../../interface";
import { getItem } from "../../../storage";
import {
    ButtonFingerprint,
    Container,
    ContainerSeparator,
    IconFingerprint,
    LineSeparator,
    Scroll,
    TextCheck,
    TextFingerprint,
    TextRecoverPassword,
    TextSeparator,
    Title,
    ViewCheckBox,
    ViewComponents,
} from "./styles";

export const Login: React.FunctionComponent = () => {
    const { signIn, isChecked, setIsChecked, user, setLoading, setUser } =
        useContext(AuthContext);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isFontsLoaded, setIsFontsLoaded] = useState<boolean>(false);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [fingerprintExists, setFingerprintExists] = useState<boolean>(false);
    const [suportedFingerprint, setSuportedFingerprint] = useState<boolean>();
    const { navigate } = useNavigation<IScreenNavigation>();

    const schema = yup.object({
        email: yup
            .string()
            .email("E-mail inválido.")
            .required("Informe seu e-mail."),
        password: yup
            .string()
            .min(6, "Mínimo de 6 dígitos.")
            .required("Digite a sua senha."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        (async () => {
            await Icon.loadFont().then(() => {
                setIsFontsLoaded(true);
            });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getItem(setIsChecked, setUser, setIsDataLoaded);
        })();
    }, [setIsChecked, setUser]);

    useEffect(() => {
        if (isFontsLoaded && isDataLoaded) {
            setIsReady(true);
        }
    }, [isFontsLoaded, isDataLoaded]);

    useEffect(() => {
        if (isChecked) {
            reset({
                email: user.email,
                password: "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset, user.email]);

    useEffect(() => {
        (async () => {
            await checkIfFingerprintExists(setFingerprintExists);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await checkIfFingerprintSupported(setSuportedFingerprint);
        })();
    }, []);

    const handleLogin = (data: IFormLogin) => {
        signIn(data);
    };

    const handleToggle = (isOn: boolean) => {
        setIsChecked(isOn);
    };

    if (!isReady) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <ImageHeader />

            <Scroll showsVerticalScrollIndicator={false}>
                <Margin size={16} />

                <Title>Acesse sua conta</Title>

                <Margin size={32} />

                <InputControl
                    iconName="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    control={control}
                    name="email"
                    errors={errors.email && (errors.email?.message as string)}
                />

                <InputPasswordControl
                    placeholder="Senha"
                    autoCapitalize="none"
                    control={control}
                    name="password"
                    errors={
                        errors.password && (errors.password?.message as string)
                    }
                />

                <ViewComponents>
                    <ViewCheckBox>
                        <TextCheck>Salvar e-mail</TextCheck>
                        <ToggleSwitch
                            isOn={isChecked}
                            onColor={theme.colors.secondary}
                            offColor={theme.colors.gray}
                            onToggle={handleToggle}
                            size="small"
                        />
                    </ViewCheckBox>

                    <TextRecoverPassword
                        onPress={() => navigate("ResetPassword")}
                    >
                        Esqueci minha senha
                    </TextRecoverPassword>
                </ViewComponents>

                <Margin size={36} />

                <PrimaryButton
                    title="Entrar"
                    onPress={handleSubmit(handleLogin)}
                />

                {suportedFingerprint && fingerprintExists && (
                    <View>
                        <Margin size={20} />
                        <ContainerSeparator>
                            <LineSeparator />
                            <TextSeparator>OU</TextSeparator>
                            <LineSeparator />
                        </ContainerSeparator>

                        <Margin size={28} />

                        <ButtonFingerprint
                            onPress={() =>
                                getAuthWithFingerprint(setUser, setLoading)
                            }
                            activeOpacity={0.6}
                        >
                            <TextFingerprint>
                                Entrar com impressão digital
                            </TextFingerprint>
                            <IconFingerprint
                                source={require("../../../assets/fingerprintLogin.png")}
                            />
                        </ButtonFingerprint>
                        <Margin size={10} />
                    </View>
                )}

                <Margin size={10} />

                <TextNavigation
                    text="Não possui conta?"
                    textNavigation="Crie uma conta"
                    screen="Register"
                />
            </Scroll>

            <LoadingModal />
        </Container>
    );
};
