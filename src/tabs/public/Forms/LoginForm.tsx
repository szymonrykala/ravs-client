import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormPage from './FormPage';
import useSession from '../../../auth/useSession';
import { Typography } from '@mui/material';
import { Redirect, Link as ReactRouterLink } from 'react-router-dom';
import { LoginResult } from '../../../services/AuthService';

import paths from '../../../shared/path';

interface LoginFormData {
    [index: string]: string | boolean,
    email: string,
    password: string
}


export default function LoginForm() {
    const { login } = useSession();

    const [remember, setRemember] = React.useState<boolean>(true);

    const [loginResult, setLoginResult] = React.useState<LoginResult>({
        message: '',
        success: false
    });

    const [data, setData] = React.useState<LoginFormData>({
        email: localStorage.getItem('email')?.toString() ?? '',
        password: '',
    })

    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });

    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (remember) localStorage.setItem('email', data.email);

        const resp = await login(
            data.email,
            data.password
        )
        setLoginResult(resp);
        console.log(resp);
    };

    return (
        <FormPage
            title='Logowanie'
            icon={<LockOutlinedIcon />}
        >
            {loginResult.success && <Redirect to={paths.HOME} />}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
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
                    label="Password"
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
                <Typography color={loginResult.success ? "green" : "red"}>
                    {loginResult.message}
                </Typography>
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
        </FormPage>
    );
}