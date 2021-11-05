import { Redirect, Route, Switch } from "react-router-dom";
import paths from "../../shared/path";
import GenericPage from "./GenericPage";
import RoomPage from "./RoomPage";



export default function ProtectedPages() {

    return (
        <Switch>
            <Route path={paths.ROOM} component={RoomPage} />
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
            <Route path={paths.HOME}>
                <GenericPage label="strona główna" />
            </Route>
            <Route path={paths.HOME + '/*'}>
                <Redirect to={paths.HOME} />
            </Route>
        </Switch>
    );
}