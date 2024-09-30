import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

interface IPropsInputControl<T extends FieldValues> extends TextInputProps {
    control: Control<T>; // formulário genérico
    name: Path<T>; // valor genérico
    errors?: string;
    iconName: string;
}

interface IPropsInputPasswordControl<T extends FieldValues>
    extends TextInputProps {
    control: Control<T>; // formulário genérico
    name: Path<T>; // valor genérico
    errors: string | undefined;
}

export const InputControl = <T extends FieldValues>({
    control,
    name,
    errors,
    ...otherProps
}: IPropsInputControl<T>) => {
    return (
        <Container>
            <ViewInput style={{ borderColor: errors && theme.colors.red }}>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            {...otherProps}
                        />
                    )}
                />
            </ViewInput>
            {errors && <TextError>{errors}</TextError>}
        </Container>
    );
};

export const InputPasswordControl = <T extends FieldValues>({
    control,
    name,
    errors,
    ...otherProps
}: IPropsInputPasswordControl<T>) => {
    const [textSecure, setTextSecure] = useState<boolean>(true);

    const handleSecure = () => {
        setTextSecure(current => (current === true ? false : true));
    };

    return (
        <Container>
            <ViewInput style={{ borderColor: errors && theme.colors.red }}>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            {...otherProps}
                            secureTextEntry={textSecure}
                        />
                    )}
                />
                <IconEye
                    name={textSecure ? "eye-off" : "eye"}
                    onPress={handleSecure}
                />
            </ViewInput>
            {errors && <TextError>{errors}</TextError>}
        </Container>
    );
};

const Container = styled.View`
    margin-bottom: 6px;
`;

const ViewInput = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    border-width: 2px;
    border-radius: 8px;
`;

const Input = styled.TextInput`
    font-size: 16px;
    margin: 0 4px;
    flex: 1;
    height: 44px;
`;

const IconEye = styled(Ionicon)`
    font-size: 24px;
    padding: 4px 10px;
`;

const TextError = styled.Text`
    position: absolute;
    margin-left: 4px;
    bottom: 0;
    color: ${theme.colors.red};
`;
