import * as Keychain from "react-native-keychain";

export const checkIfFingerprintExists = async (
    setFingerprintExists: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    await Keychain.getGenericPassword()
        .then(value => {
            if (value) {
                setFingerprintExists(true);
            } else {
                setFingerprintExists(false);
            }
        })
        .catch(() => {
            setFingerprintExists(false);
        });
};
