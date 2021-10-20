import { Box } from "@mui/material";
import { Redirect, Route, Switch } from "react-router";
import useSession from "../../auth/useSession";
import paths from "../../shared/path";
import ActivateForm from "./Forms/ActivationForm";

import LoginForm from "./Forms/LoginForm";
import RegisterForm from "./Forms/RegisterForm";



export default function () {
    const { user } = useSession();


    return (
        <Box sx={{
            alignItems: "center",
            justifyContent: 'center',
            flexDirection: 'column',
            display: 'flex',
            height: '65%',
        }}>
            {/* public */}
            {/* {user && <Redirect to={paths.HOME} />} */}
            <Switch>

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
            </Switch>
        </Box>
    );
}