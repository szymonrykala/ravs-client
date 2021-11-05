import { Box } from '@mui/system';

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import paths from '../shared/path';

import ProtectedPages from './protected';
import PublicPages from './public';


const tabStyle = {
    minHeight: "80vh",
}


export default function Tabs() {
    return (
        <Box sx={tabStyle}>
            <Switch>
                <Route path={paths.HOME} component={ProtectedPages} />
                <Route path={paths.PUBLIC} component={PublicPages} />
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