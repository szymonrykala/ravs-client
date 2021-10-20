import { Redirect, Route } from "react-router-dom";
import AnimatedRouterSwitch from "../../shared/components/AnimatedRouterSwitch/index";
import paths from "../../shared/path";

import ActivateForm from "./Forms/ActivationForm";

import LoginForm from "./Forms/LoginForm";
import RegisterForm from "./Forms/RegisterForm";


export default function () {

    return (
        <AnimatedRouterSwitch>
            <Route path={paths.LOGIN}>
                <LoginForm />
            </Route>
            <Route path={paths.REGISTER}>
                <RegisterForm />
            </Route>
            <Route path={paths.ACTIVATE}>
                <ActivateForm />
            </Route>
            <Route path="*">
                <Redirect to={paths.WELCOME} />
            </Route>
        </AnimatedRouterSwitch>
    );
}