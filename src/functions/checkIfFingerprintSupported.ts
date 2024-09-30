import ReactNativeBiometrics from "react-native-biometrics";

/**
 * Function to find out if the device supports biometrics.
 * @param setSuportedFingerprint
 */
export const checkIfFingerprintSupported = async (
    setSuportedFingerprint: (value: boolean) => void,
) => {
    const rnBiometrics = new ReactNativeBiometrics();

    await rnBiometrics.isSensorAvailable().then(resultObject => {
        if (resultObject.available) {
            setSuportedFingerprint(true);
        } else {
            setSuportedFingerprint(false);
        }
    });
};
