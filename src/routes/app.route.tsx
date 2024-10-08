import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomDrawer } from "../components/CustomDrawer";
import theme from "../global/styles/theme";
import { AJuda } from "../pages/Ajuda";
import { Boleto } from "../pages/Boleto";
import { Cartao } from "../pages/Cartao";
import { HomeCash } from "../pages/CashSimulation/HomeCash";
import { Operacao } from "../pages/CashSimulation/Operacao";
import { Contrato } from "../pages/Contrato";
import { Fatura } from "../pages/Fatura";
import { Home } from "../pages/Home";
import { Investimento } from "../pages/Investimento";
import { Negociacao } from "../pages/Negociacao";
import { Profile } from "../pages/Perfil";
import { ConfirmPix } from "../pages/Pix/ConfirmPix";
import { Pix } from "../pages/Pix/Home";
import { PayPix } from "../pages/Pix/PayPix";
import { PaymentVoucher } from "../pages/Pix/PaymentVoucher";
import { Poupanca } from "../pages/Poupanca";
import { Qr_Code } from "../pages/Qr_Code";
import { Recarga } from "../pages/Recarga";
import { FingerprintRegistration } from "../pages/RegistroDigital";
import { Transacoes } from "../pages/Transactions";
import { TransactionsDetails } from "../pages/Transactions/TransactionsDetails";
import { Transferencia } from "../pages/Transferencia";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const TabRoutes: React.FunctionComponent = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: "#909090",
                tabBarStyle: { borderTopWidth: 0 },
                tabBarLabelStyle: { fontSize: 11 },
            }}
        >
            <Tab.Screen
                name="AppRoutes"
                component={AppRoutes}
                options={{
                    title: "Início",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Qr_Code"
                component={Qr_Code}
                options={{
                    title: "QR Code",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="qr-code" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const HomeRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                headerTintColor: theme.colors.white,
                headerStyle: { backgroundColor: theme.colors.primary },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Transacoes"
                component={Transacoes}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Cartao"
                component={Cartao}
                options={{ title: "Cartões" }}
            />

            <Stack.Screen name="Fatura" component={Fatura} />

            <Stack.Screen name="Recarga" component={Recarga} />

            <Stack.Screen name="Pix" component={Pix} />

            <Stack.Screen name="Boleto" component={Boleto} />

            <Stack.Screen
                name="Transferencia"
                component={Transferencia}
                options={{ title: "Transferência" }}
            />

            <Stack.Screen
                name="Poupanca"
                component={Poupanca}
                options={{ title: "Poupança" }}
            />

            <Stack.Screen
                name="Investimento"
                component={Investimento}
                options={{ title: "Investimentos" }}
            />

            <Stack.Screen
                name="Negociacao"
                component={Negociacao}
                options={{ title: "Negociação" }}
            />

            <Stack.Screen name="Ajuda" component={AJuda} />

            <Stack.Screen
                name="Contrato"
                component={Contrato}
                options={{ title: "Contrato" }}
            />

            <Stack.Screen
                name="PayPix"
                component={PayPix}
                options={{ title: "Pagamento" }}
            />

            <Stack.Screen
                name="ConfirmPix"
                component={ConfirmPix}
                options={{ title: "Confirmar" }}
            />

            <Stack.Screen
                name="PaymentVoucher"
                component={PaymentVoucher}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TransactionsDetails"
                component={TransactionsDetails}
                options={{ title: "Detalhes da transação" }}
            />

            <Stack.Screen
                name="CashSimulationRoutes"
                component={CashSimulationRoutes}
                options={{ title: "Caixa eletrônico" }}
            />

            <Stack.Screen
                name="Fingerprint"
                component={FingerprintRegistration}
                options={{ title: "Cadastramento digital" }}
            />
        </Stack.Navigator>
    );
};

const CashSimulationRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                headerTintColor: theme.colors.white,
                headerStyle: { backgroundColor: theme.colors.primary },
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeCash" component={HomeCash} />

            <Stack.Screen name="Operacao" component={Operacao} />
        </Stack.Navigator>
    );
};

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="HomeRoutes"
                component={HomeRoutes}
                options={{ title: "Início" }}
            />
        </Drawer.Navigator>
    );
};
