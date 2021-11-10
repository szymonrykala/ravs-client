import { Redirect, Route, Switch } from "react-router-dom";
import paths from "../../shared/path";

import Activation from "./Activation";
import Login from "./Login";
import Register from "./Register";
import ChangePassword from "./ChangePassword";
import Welcome from "./Welcome";


export default function PublicPages() {

    return (
        <Switch>
            <Route path={paths.LOGIN} component={Login} />
            <Route path={paths.REGISTER} component={Register} />
            <Route path={paths.ACTIVATE} component={Activation} />
            <Route path={paths.REMIND_PASSWORD} component={ChangePassword} />
            <Route path={paths.PUBLIC} component={Welcome} />

            <Route path="*">
                <Redirect to={paths.PUBLIC} />
            </Route>
        </Switch>
    );
}