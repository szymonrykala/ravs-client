import { Box } from "@mui/material";
import { Redirect, Route, Switch } from "react-router-dom";
import paths from "../../shared/path";



export default function () {

    return (
        <Box sx={{
            alignItems: "center",
            justifyContent: 'center',
            flexDirection: 'column',
            display: 'flex',
            height: '65%',
        }}>
            <Switch>
                <Route path={paths.ROOM}>
                    pokój
                </Route>
                <Route path={paths.BUILDING}>
                    budynek
                </Route>
                <Route path={paths.ADDRESS}>
                    adres
                </Route>
                <Route path={paths.SETTINGS}>
                    settings
                </Route>
                <Route path={paths.INFRASTRUCTURE}>
                    Zasoby
                </Route>
                <Route path={paths.MY_PROFILE}>
                    profil
                </Route>
                <Route exact path={paths.HOME}>
                    home
                </Route>
                <Route path="*"><Redirect to={paths.HOME} /></Route>
            </Switch>
        </Box>
    );
}