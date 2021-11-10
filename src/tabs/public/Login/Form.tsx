import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import useSession from '../../../auth/useSession';
import { Typography } from '@mui/material';
import { Redirect, Link as ReactRouterLink } from 'react-router-dom';
import { LoginFormData } from '../../../services/AuthService';

import paths from '../../../shared/path';
// import { loginReducer } from './loginReducer';
import { initialReducerResult } from '../../../shared/reducreInterfaces';



export default function Form() {
    const { login } = useSession();

    // const [result, dispatchLogin] = React.useReducer(
    //     loginReducer,
    //     initialReducerResult
    // );

    const [remember, setRemember] = React.useState<boolean>(true);
    const [data, setData] = React.useState<LoginFormData>({
        email: localStorage.getItem('email')?.toString() ?? '',
        password: '',
    });

    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (remember) localStorage.setItem('email', data.email);
        login(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {/* {result.success && <Redirect to={paths.HOME} />} */}
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adres Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={onChange}
                defaultValue={data.email}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                value={data.password}
                onChange={onChange}
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={() => setRemember(!remember)}
                    name="remember"
                    checked={remember}
                    color="primary"
                />}
                label="Zapamiętaj mnie"
            />
            {/* <Typography color={result.success ? "green" : "red"}>
                {result.message}
            </Typography> */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Zaloguj
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link component={ReactRouterLink} to={paths.REMIND_PASSWORD} variant="body2">
                        Zapomniałeś hasła?
                    </Link>
                </Grid>
                <Grid item >
                    <Link component={ReactRouterLink} to={paths.REGISTER} variant="body2">
                        Zarejestruj się!
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Link component={ReactRouterLink} to={paths.ACTIVATE} variant="body2">
                        Aktywuj konto
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}