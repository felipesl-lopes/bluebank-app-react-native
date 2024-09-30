import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import * as Keychain from "react-native-keychain";
import { IUser } from "../interface";

export const getAuthWithFingerprint = async (
    setUser: (value: React.SetStateAction<IUser>) => void,
    setLoading: (value: boolean) => void,
) => {
    const rnBiometrics = new ReactNativeBiometrics();

    await rnBiometrics
        .simplePrompt({ promptMessage: "     Confirmar impressão digital" })
        .then(async resultObject => {
            const { success } = resultObject;
            if (success) {
                setLoading(true);

                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    await auth()
                        .signInWithEmailAndPassword(
                            credentials.username,
                            credentials.password,
                        )
                        .then(async value => {
                            const uid = value.user.uid;
                            await firestore()
                                .collection("users")
                                .doc(uid)
                                .get()
                                .then(async user => {
                                    const data = user.data();
                                    if (data) {
                                        const dados = {
                                            name: data.name,
                                            cpf: data.cpf,
                                            balance: data.balance,
                                            email: data.email,
                                            uid: value.user.uid,
                                        };
                                        setUser(dados);
                                    }
                                });
                        })
                        .catch(() => {
                            Alert.alert("Erro ao realizar login.");
                        });
                }
            }
        })
        .catch(() => {
            Alert.alert("Falha na autenticação com impressão digital.");
        })
        .finally(() => {
            setLoading(false);
        });
};
