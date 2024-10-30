import firestore from "@react-native-firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ContactsList } from "../../../components/ContactsList";
import { AuthContext } from "../../../contexts/auth";
import { IUser } from "../../../interface";
import { Contacts, Container, FlatListContacts } from "./styles";

export const Pix: React.FunctionComponent = () => {
    const { user } = useContext(AuthContext);
    const [listUsers, setListUsers] = useState<IUser[]>([]);

    useEffect(() => {
        (async () => {
            firestore()
                .collection("users")
                .orderBy("name", "asc")
                .get()
                .then(value => {
                    const list: IUser[] = [];
                    setListUsers([]);
                    value.docs.forEach(doc => {
                        const data = doc.data() as Omit<IUser, "uid">;
                        if (doc.id !== user.uid) {
                            list.push({ ...data, uid: doc.id });
                        }
                    });
                    setListUsers(list);
                });
        })();
    }, [user.uid]);

    return (
        <Container>
            <Contacts>Contatos</Contacts>
            <FlatListContacts
                data={listUsers}
                renderItem={({ item }) => <ContactsList user={item} />}
            />
        </Container>
    );
};
