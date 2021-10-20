import { Box } from '@mui/system';


import {
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import useSession from '../auth/useSession';
import paths from '../shared/path';



import ProtectedPages from './protected';
import PublicPages from './public';


const tabStyle = {
    minHeight: "80vh",
}


export default function Tabs() {
    const { user } = useSession();

    return (
        <Box sx={tabStyle}>
            {/* <Link to={paths.HOME}>protected app</Link><br /> */}


            <Switch>
                <Route path={paths.HOME}>
                    {user ? <ProtectedPages /> : <Redirect to={paths.LOGIN} />}
                </Route>
                <Route path={paths.PUBLIC}>
                    <PublicPages />
                </Route>
                <Route path={paths.WELCOME}>
                    Witaj w Rav System !
                </Route>
                <Route path={paths.FAQ}>
                    Częste pytania i odpowiedzi FAQ
                </Route>
                <Route path='*'>
                    <Redirect to={paths.PUBLIC} />
                </Route>
            </Switch>
        </Box>
    );
}