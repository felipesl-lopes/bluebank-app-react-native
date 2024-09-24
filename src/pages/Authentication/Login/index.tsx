import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ToggleSwitch from "toggle-switch-react-native";
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
import { getAuthWithBiometry } from "../../../functions/getAuthWithBiometry";
import { getHaveBiometrics } from "../../../functions/getHaveBiometrics";
import { getSuportedBiometry } from "../../../functions/getSuportedBiometry";
import theme from "../../../global/styles/theme";
import { IFormLogin, IScreenNavigation } from "../../../interface";
import { getItem } from "../../../storage";
import {
    ButtonBiometry,
    Container,
    ContainerSeparator,
    IconBiometry,
    LineSeparator,
    Scroll,
    TextBiometry,
    TextCheck,
    TextRecoverPassword,
    TextSeparator,
    ViewCheckBox,
    ViewComponents,
    ViewLogo,
    ViewOpacity,
    Wallpaper,
} from "./styles";

export const Login: React.FunctionComponent = () => {
    const { signIn, isChecked, setIsChecked, user, setLoading, setUser } =
        useContext(AuthContext);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isFontsLoaded, setIsFontsLoaded] = useState<boolean>(false);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [haveBiometrics, setHaveBiometrics] = useState<boolean>(false);
    const [suportedBiometrics, setSuportedBiometrics] = useState<boolean>();
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
            await getHaveBiometrics(setHaveBiometrics);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getSuportedBiometry(setSuportedBiometrics);
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
            <Wallpaper
                source={require("../../../assets/Background/background.jpg")}
            >
                <ViewOpacity>
                    <ViewLogo>
                        <Logo_name_white scale={3} />
                    </ViewLogo>

                    <Scroll showsVerticalScrollIndicator={false}>
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

                        <Margin pixels={40} />

                        <PrimaryButton
                            title="ENTRAR"
                            onPress={handleSubmit(handleLogin)}
                        />

                        <Margin pixels={8} />

                        <SecondaryButton
                            title="CRIAR CONTA"
                            screen={"Register"}
                        />

                        {suportedBiometrics ? (
                            haveBiometrics ? (
                                <View>
                                    <ContainerSeparator>
                                        <LineSeparator />
                                        <TextSeparator>OU</TextSeparator>
                                        <LineSeparator />
                                    </ContainerSeparator>

                                    <ButtonBiometry
                                        style={{ elevation: 4 }}
                                        onPress={() =>
                                            getAuthWithBiometry(
                                                setUser,
                                                setLoading,
                                            )
                                        }
                                        activeOpacity={0.6}
                                    >
                                        <TextBiometry>
                                            Entrar com biometria
                                        </TextBiometry>
                                        <IconBiometry
                                            source={require("../../../assets/biometry.png")}
                                        />
                                    </ButtonBiometry>
                                </View>
                            ) : (
                                <View style={{ marginBottom: "10%" }} />
                            )
                        ) : (
                            <View style={{ marginBottom: "10%" }} />
                        )}
                    </Scroll>
                </ViewOpacity>
            </Wallpaper>
            <LoadingModal />
        </Container>
    );
};
