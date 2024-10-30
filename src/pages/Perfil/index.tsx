import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import * as yup from "yup";
import { HeaderDrawer_2 } from "../../components/HeaderDrawer";
import { InputControl } from "../../components/InputControl";
import { Margin } from "../../components/Margin";
import { ModalPasswordConfirm } from "../../components/ModalPasswordConfirm";
import { PrimaryButton, SecondaryButton } from "../../components/SendButton";
import { AuthContext } from "../../contexts/auth";
import { getUpdateProfile } from "../../functions/getUptadeProfile";
import { IFormEditProfile } from "../../interface";
import { Container, Scroll, Title } from "./styles";

export const Profile: React.FunctionComponent = () => {
    const { user, setUser, isChecked, setLoading } = useContext(AuthContext);
    const [show, setShow] = useState<boolean>(false);
    const [data, setData] = useState<IFormEditProfile>({} as IFormEditProfile);

    const schema = yup.object({
        name: yup.string().required("Informe seu nome completo."),
        email: yup
            .string()
            .email("E-mail inválido.")
            .required("Informe seu e-mail."),
        cpf: yup
            .string()
            .min(11, "Mínimo de 11 dígitos")
            .required("Digite seu CPF."),
    });

    const defaultValues = useMemo(
        () => ({
            name: user.name,
            email: user.email,
            cpf: user.cpf,
        }),
        [user.name, user.email, user.cpf],
    );

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }, // isDirty para saber se o formulario sofreu alteração
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [reset, defaultValues]);

    const updateData = async (data: IFormEditProfile) => {
        setShow(true);
        setData(data);
        Keyboard.dismiss();
    };

    const handleFunction = async (password: string) => {
        setLoading(true);
        await getUpdateProfile(data, user, setUser, isChecked, password);
    };

    return (
        <Container>
            <HeaderDrawer_2 title="Perfil" />

            <Scroll>
                <Margin size={32} />

                <Title>Clique sobre o campo para alterar o valor.</Title>

                <Margin size={24} />

                <InputControl
                    control={control}
                    iconName="person"
                    placeholder="Nome completo"
                    autoCapitalize="words"
                    name="name"
                    errors={errors.name && (errors.name?.message as string)}
                />

                <InputControl
                    control={control}
                    iconName="mail"
                    name="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="E-mail"
                    errors={errors.email && (errors.email?.message as string)}
                />

                <InputControl
                    control={control}
                    iconName="card"
                    name="cpf"
                    keyboardType="numeric"
                    placeholder="CPF"
                    maxLength={11}
                    errors={errors.cpf && (errors.cpf?.message as string)}
                />

                <Margin size={12} />

                <PrimaryButton
                    onPress={handleSubmit(updateData)}
                    title="Salvar"
                    disabled={!isDirty}
                    style={{
                        opacity: !isDirty ? 0.4 : 1,
                    }}
                />

                <Margin size={8} />

                <SecondaryButton
                    onPress={() => {
                        reset();
                        Keyboard.dismiss();
                    }}
                    title="Cancelar"
                    disabled={!isDirty}
                    style={{
                        opacity: !isDirty ? 0.4 : 1,
                    }}
                />
            </Scroll>

            <ModalPasswordConfirm
                setShow={setShow}
                show={show}
                handleFunction={handleFunction}
            />
        </Container>
    );
};
