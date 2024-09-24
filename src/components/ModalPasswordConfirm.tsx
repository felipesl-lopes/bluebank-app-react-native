import { yupResolver } from "@hookform/resolvers/yup";
import auth from "@react-native-firebase/auth";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import * as yup from "yup";
import { AuthContext } from "../contexts/auth";
import theme from "../global/styles/theme";
import { InputPasswordControl } from "./InputControl";
import { LoadingModal } from "./LoadingModal";
import { PrimaryButton } from "./SendButton";

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
    const { user } = useContext(AuthContext);
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

    const confirmDataChange = async (value: IPassword) => {
        const credentials = auth.EmailAuthProvider.credential(
            user.email,
            value.password,
        );

        auth()
            .currentUser?.reauthenticateWithCredential(credentials)
            .then(async () => {
                await handleFunction(value.password)
                    .then(() => {
                        setShow(false);
                        reset();
                    })
                    .catch(error => {
                        console.log(error);
                        Alert.alert(
                            "Erro",
                            "Houve um erro ao confirmar a senha. Tente novamente.",
                        );
                    });
            });
    };

    return (
        <Modal
            visible={show}
            transparent={true}
            statusBarTranslucent={true}
            animationType="fade"
        >
            <Screen>
                <Container>
                    <ButtonCancel name="close" onPress={() => setShow(false)} />
                    <Title>Digite a sua senha</Title>
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

                    <View style={{ marginBottom: 20 }} />

                    <PrimaryButton
                        onPress={handleSubmit(confirmDataChange)}
                        title="Confirmar"
                    />
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
    background-color: ${theme.colors.background};
    border-radius: 10px;
    padding: 14px;
    width: 80%;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
`;

const ButtonCancel = styled(Ionicons)`
    position: absolute;
    right: 0;
    font-size: 25px;
    padding: 7px;
`;
