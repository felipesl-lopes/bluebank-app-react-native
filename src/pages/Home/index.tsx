import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AccountDashboard } from "../../components/AccountDashboard";
import { BiometricsRegistrationService } from "../../components/BiometricsRegistrationService";
import { HeaderDrawer } from "../../components/HeaderDrawer";
import { Margin } from "../../components/Margin";
import { OtherServicesList } from "../../components/OtherServicesList";
import { ServiceCardList } from "../../components/ServiceCardList";
import { getHaveBiometrics } from "../../functions/getHaveBiometrics";
import { getSuportedBiometry } from "../../functions/getSuportedBiometry";
import { handleSliders } from "../../functions/handleSliders";
import { ISliders } from "../../interface";
import { Background, Body, Container, Scroll } from "./styles";

export const Home: React.FunctionComponent = () => {
    const [isBiometry, setIsBiometry] = useState<boolean>(false);
    const [, setSliders] = useState<ISliders[]>([]);
    const [suportedBiometry, setSuportedBiometry] = useState<boolean>();

    useEffect(() => {
        (async () => {
            await getHaveBiometrics(setIsBiometry);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getSuportedBiometry(setSuportedBiometry);
        })();
    }, [setSuportedBiometry]);

    useEffect(() => {
        (async () => {
            await handleSliders(setSliders);
        })();
    }, [setSliders]);

    return (
        <Container>
            <HeaderDrawer />

            <Background
                source={require("../../assets/Background/background.jpg")}
            >
                <Scroll>
                    <Margin pixels={24} />

                    <AccountDashboard />

                    <Margin pixels={40} />

                    <Body>
                        <ServiceCardList />

                        <Margin pixels={50} />

                        {!suportedBiometry ||
                            (!isBiometry && (
                                <View>
                                    <BiometricsRegistrationService />
                                    <Margin pixels={50} />
                                </View>
                            ))}

                        {/* Existe um erro na biblioteca, no módulo com View.proptypes.style. Verificar depois se o erro foi corrigido. */}
                        {/* {sliders && (
                            <View>
                                <CarouselSliders sliders={sliders} />
                                <Margin pixels={20} />
                            </View>
                        )} */}

                        <OtherServicesList />
                    </Body>
                </Scroll>
            </Background>
        </Container>
    );
};
