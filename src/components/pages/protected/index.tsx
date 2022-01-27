import { Redirect, Route, Switch } from "react-router-dom";
import useSession from "../../../auth/useSession";
import paths from "../../../shared/path";
import AccessPage from "./AccessPage";
import AddressPage from "./AddressPage";
import BuildingPage from "./BuildingPage";
import HomePage from "./HomePage";
import LogsPage from "./LogsPage";
import RoomPage from "./RoomPage";
import SettingsPage from "./SettingsPage";
import UserPage from "./UserPage";
import UsersPage from "./UsersPage";



export default function ProtectedPages() {
    const { user } = useSession();

    if (!user) return <Redirect to={paths.PUBLIC} />

    return (
        <Switch>
            <Route path={paths.ROOM} component={RoomPage} />
            <Route path={paths.BUILDING} component={BuildingPage} />
            <Route path={paths.ADDRESS} component={AddressPage} />

            <Route path={paths.SETTINGS} component={SettingsPage} />
            <Route path={paths.ACCESS} component={AccessPage} />
            <Route path={paths.USER} component={UserPage} />
            <Route path={paths.USERS} component={UsersPage} />
            <Route path={paths.LOGS} component={LogsPage} />
            <Route path={paths.HOME} component={HomePage} />

            <Route path={paths.INFRASTRUCTURE}>
                Zasoby
            </Route>
            <Route path={paths.HOME + '/*'}>
                <Redirect to={paths.HOME} />
            </Route>
        </Switch>
    );
}