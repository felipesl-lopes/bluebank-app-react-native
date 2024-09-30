import React from "react";
import { AccountDashboard } from "../../components/AccountDashboard";
import { FingerprintRegistrationService } from "../../components/FingerprintRegistrationService";
import { HeaderDrawer } from "../../components/HeaderDrawer";
import { Margin } from "../../components/Margin";
import { OtherServicesList } from "../../components/OtherServicesList";
import { ServiceCardList } from "../../components/ServiceCardList";
import { Container, Scroll } from "./styles";

export const Home: React.FunctionComponent = () => {
    return (
        <Container>
            <HeaderDrawer />

            <Scroll showsVerticalScrollIndicator={false}>
                <Margin size={20} />

                <AccountDashboard />

                <Margin size={20} />

                <ServiceCardList />

                <Margin size={20} />

                <FingerprintRegistrationService />

                <OtherServicesList />
                <Margin size={20} />
            </Scroll>
        </Container>
    );
};
