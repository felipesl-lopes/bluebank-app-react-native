import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { ITransactions, IUser } from "../interface";

export const handleTransactions = async (
    setLoading: (value: React.SetStateAction<boolean>) => void,
    user: IUser,
    setTransactions: (value: React.SetStateAction<ITransactions[]>) => void,
    date: Date,
) => {
    setLoading(true);

    await firestore()
        .collection("transactions")
        .doc(user.uid)
        .collection("transactions")
        .orderBy("date", "desc")
        .get()
        .then(value => {
            const list: ITransactions[] = [];
            setTransactions([]);
            value.docs.forEach(dat => {
                if (date.toLocaleDateString() == dat.data().date.slice(0, 10)) {
                    list.push(dat.data() as ITransactions);
                }
            });
            setTransactions(list);
        })
        .catch(() => {
            Alert.alert("Erro ao exibir transações.");
        })
        .finally(() => {
            setLoading(false);
        });
};
