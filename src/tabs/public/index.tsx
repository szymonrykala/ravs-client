import { Redirect, Route, Switch } from "react-router-dom";
import paths from "../../shared/path";

import ActivationPage from "./ActivationPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import RemindPasswordPage from "./RemindPasswordPage";
import WelcomePage from "./WelcomePage";


export default function PublicPages() {

    return (
        <Switch>
            <Route path={paths.LOGIN} component={LoginPage} />
            <Route path={paths.REGISTER} component={RegisterPage} />
            <Route path={paths.ACTIVATE} component={ActivationPage} />
            <Route path={paths.REMIND_PASSWORD} component={RemindPasswordPage} />
            <Route path={paths.PUBLIC} component={WelcomePage} />

            <Route path="*">
                <Redirect to={paths.PUBLIC} />
            </Route>
        </Switch>
    );
}