import * as Keychain from "react-native-keychain";

export const getHaveBiometrics = async (
    setIsBiometry: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    await Keychain.getGenericPassword()
        .then(value => {
            if (value) {
                setIsBiometry(true);
            } else {
                setIsBiometry(false);
            }
        })
        .catch(() => {
            setIsBiometry(false);
        });
};
