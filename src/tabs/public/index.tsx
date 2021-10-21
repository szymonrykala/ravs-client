import { Redirect, Route } from "react-router-dom";
import AnimatedRouterSwitch from "../../shared/components/AnimatedRouterSwitch/index";
import paths from "../../shared/path";

import ActivationPage from "./ActivationPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import RemindPasswordPage from "./RemindPasswordPage";


export default function () {

    return (
        <AnimatedRouterSwitch>
            <Route path={paths.LOGIN} component={LoginPage} />
            <Route path={paths.REGISTER} component={RegisterPage} />
            <Route path={paths.ACTIVATE} component={ActivationPage} />
            <Route path={paths.REMIND_PASSWORD} component={RemindPasswordPage} />

            <Route path="*">
                <Redirect to={paths.WELCOME} />
            </Route>
        </AnimatedRouterSwitch>
    );
}