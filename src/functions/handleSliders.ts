import firestore from "@react-native-firebase/firestore";
import { ISliders } from "../interface";

export const handleSliders = async (
    setSliders: (value: React.SetStateAction<ISliders[]>) => void,
) => {
    await firestore()
        .collection("banners")
        .get()
        .then(async values => {
            const list: ISliders[] = [];
            setSliders([]);
            values.forEach(element => {
                list.push(element.data() as ISliders);
            });
            setSliders(list);
        })
        .catch(() => {
            setSliders([]);
        });
};
