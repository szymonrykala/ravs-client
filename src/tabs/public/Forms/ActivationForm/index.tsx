import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link as ReactRouterLink, Redirect } from 'react-router-dom';

import paths from '../../../../shared/path';
import UserService, { ActivationData } from '../../../../services/UserService';
import UniqueCodeButton from '../../../../shared/components/UniqueCodeButton';
import { activationReducer } from './activationReducer';
import { initialReducerResult } from '../../../../shared/reducreInterfaces';



export default function ActivationForm() {
    const [result, dispatchResult] = React.useReducer(
        activationReducer,
        initialReducerResult
    );

    const [data, setData] = React.useState<ActivationData>({
        email: localStorage.getItem('email')?.toString() ?? '',
        password: '',
        code: ''
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const resp = await UserService.activate(data);
            dispatchResult(resp);
        } catch (err: any) {
            dispatchResult({
                statusCode: err.statusCode,
                payload: err.error.description
            })
        }
    };

    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {result.success && <Redirect to={paths.LOGIN} />}
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adress Email"
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
            <TextField
                margin="normal"
                required
                fullWidth
                name="code"
                label="Kod"
                type="text"
                id="code"
                value={data.code}
                onChange={onChange}
                autoComplete="email-code"
            />
            <UniqueCodeButton
                email={data.email}
                text="Jeżeli nie otrzymałeś kodu mailem, naciśnij przycisk."
            />
            <Typography sx={{ mt: "15px", color: "red" }}>
                {result.message}
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Aktywuj
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link component={ReactRouterLink} to={paths.LOGIN} variant="body2" >
                        Masz już konto? Zaloguj się!
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}