import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { TabRoutes } from "./app.route";
import { AuthRoutes } from "./auth.route";

export const Routes: React.FunctionComponent = () => {
    const { signed } = useContext(AuthContext);

    return signed ? <TabRoutes /> : <AuthRoutes />;
};
