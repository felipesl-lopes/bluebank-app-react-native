import { yupResolver } from "@hookform/resolvers/yup";
import auth from "@react-native-firebase/auth";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import * as yup from "yup";
import { AuthContext } from "../contexts/auth";
import theme from "../global/styles/theme";
import { InputPasswordControl } from "./InputControl";
import { LoadingModal } from "./LoadingModal";
import { Margin } from "./Margin";

interface IProps {
    show: boolean;
    setShow: (value: boolean) => void;
    handleFunction: (password: string) => Promise<void>;
}

interface IPassword {
    password: string;
}

export const ModalPasswordConfirm: React.FunctionComponent<IProps> = ({
    show,
    setShow,
    handleFunction,
}) => {
    const { user, setLoading } = useContext(AuthContext);

    const schema = yup.object({
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
    });

    /**
     * Função para confirmação de senha.
     * @param value
     */
    const confirmDataChange = async (value: IPassword) => {
        setLoading(true);
        const credentials = auth.EmailAuthProvider.credential(
            user.email,
            value.password,
        );

        auth()
            .currentUser?.reauthenticateWithCredential(credentials)
            .then(async () => {
                await handleFunction(value.password).then(() => {
                    setShow(false);
                    reset();
                });
            })
            .catch(() => {
                Alert.alert(
                    "Erro ao confirmar senha",
                    "Verifique sua senha e tente novamente.",
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const cancel = () => {
        reset();
        setShow(false);
    };

    return (
        <Modal
            visible={show}
            transparent={true}
            statusBarTranslucent={true}
            animationType="fade"
        >
            <Screen>
                <Container style={{ elevation: 10 }}>
                    <ButtonCancel name="close" onPress={cancel} />

                    <Title>Confirme sua senha</Title>

                    <Margin size={8} />

                    <Text>
                        Para confirmar as alterações de seus dados, por favor,
                        insira sua senha.
                    </Text>

                    <Margin size={16} />

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

                    <Margin size={12} />

                    <ContainerButtons>
                        <TextButton
                            onPress={cancel}
                            style={{ color: undefined }}
                        >
                            CANCELAR
                        </TextButton>
                        <TextButton onPress={handleSubmit(confirmDataChange)}>
                            CONFIRMAR
                        </TextButton>
                    </ContainerButtons>
                </Container>
                <LoadingModal />
            </Screen>
        </Modal>
    );
};

const Screen = styled.View`
    background-color: rgba(100, 100, 100, 0.8);
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Container = styled.View`
    background-color: ${theme.colors.background2};
    border-radius: 10px;
    padding: 20px;
    width: 90%;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: 500;
    color: black;
`;

const Text = styled.Text`
    font-size: 16px;
`;

const ButtonCancel = styled(Ionicons)`
    position: absolute;
    right: 0;
    font-size: 26px;
    padding: 10px;
`;

const ContainerButtons = styled.View`
    flex-direction: row;
    align-self: flex-end;
`;

const TextButton = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: ${theme.colors.primary};
    margin-left: 24px;
`;
