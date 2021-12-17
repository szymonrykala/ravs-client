import { Redirect, Route, Switch } from "react-router-dom";
import paths from "../../../shared/path";
import Loading from "../../../shared/components/Loading";
import React from "react";


const Activation = React.lazy(() => import('./Activation'));
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const ChangePassword = React.lazy(() => import('./ChangePassword'));
const Welcome = React.lazy(() => import('./Welcome'));


export default function PublicPages() {

    return (
        <Switch>
            <React.Suspense fallback={<Loading />}>
                <Route path={paths.LOGIN} component={Login} />
                <Route path={paths.REGISTER} component={Register} />
                <Route path={paths.ACTIVATE} component={Activation} />
                <Route path={paths.REMIND_PASSWORD} component={ChangePassword} />
                <Route path={paths.PUBLIC} exact component={Welcome} />
            </React.Suspense>

            <Route path="*">
                <Redirect to={paths.PUBLIC} />
            </Route>
        </Switch>
    );
}