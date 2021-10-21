import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import UserService, { RegisterUserData } from '../../../../services/UserService';
import paths from '../../../../shared/path';
import { Link as ReactRouterLink, Redirect } from 'react-router-dom';
import { registerReducer } from './registerReducer';
import { Typography } from '@mui/material';
import { initialReducerResult } from '../../../../shared/reducreInterfaces';


export default function RegisterForm() {
    const [result, dispatchResult] = React.useReducer(
        registerReducer,
        initialReducerResult
    );

    const [data, setData] = React.useState<RegisterUserData>({
        email: "",
        password: "",
        name: "",
        surname: ""
    });

    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const resp = await UserService.register(data);
            dispatchResult(resp);
        } catch (err: any) {
            dispatchResult({
                statusCode: err.statusCode,
                payload: err?.error?.description
            })
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {result.success && <Redirect to={paths.ACTIVATE} />}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Imię"
                        autoFocus
                        value={data.name}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="surname"
                        label="Nazwisko"
                        name="surname"
                        autoComplete="family-name"
                        value={data.surname}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Adres Email"
                        name="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={data.password}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox required value="allowExtraEmails" color="primary" />}
                        label="Akceptuję warunki"
                    />
                </Grid>
            </Grid>
            <Typography sx={{ mt: "15px", color: result.success ? "green" : "red" }}>
                {result.message}
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Załóż konto!
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