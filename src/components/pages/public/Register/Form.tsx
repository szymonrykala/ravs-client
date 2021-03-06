import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link as ReactRouterLink, Redirect } from 'react-router-dom';
import useNotification from '../../../../contexts/NotificationContext/useNotification';
import UserService, { RegisterState, RegisterUserData } from '../../../../services/UserService';
import paths from '../../../../shared/path';


export default function Form() {
    const notify = useNotification();

    const [repeatPass, setRepeatPass] = React.useState<string>('');
    const [passError, setPassError] = React.useState<string | null>(null);

    const [data, setData] = React.useState<RegisterUserData>({
        email: "",
        password: "",
        name: "",
        surname: ""
    });

    const onRepeatPasswordChange = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const repeated = evt.target.value as string;

        if (repeated !== data.password) {
            setPassError('Podane hasła się różnią');
        } else {
            setPassError(null)
        }
        setRepeatPass(repeated);

    }, [
        data.password
    ]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setData(old => ({ ...old, [e.target.name]: e.target.value }));
    }, []);


    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (repeatPass !== data.password) {
            notify('Podane hasła muszą być takie same', 'error');
            return;
        }

        try {
            const state = await UserService.register(data);
            switch (state) {
                case RegisterState.ACTIVATION_NEEDED:
                    notify("Zarejestrowano", 'success', () => <Redirect to={paths.ACTIVATE} />);
                    break;
                case RegisterState.NO_ACTIVATION_NEEDED:
                    notify("Zarejestrowano i aktywowano", 'success', () => <Redirect to={paths.LOGIN} />);
                    break;
            }
        } catch (err: any) {
            let message = err.description;
            notify(message, 'error');
        }
    }, [
        data, 
        notify,
        repeatPass
    ]);


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    <TextField
                        required
                        fullWidth
                        name="repeatPassword"
                        label="Powtórz Hasło"
                        type="password"
                        id="repeatPassword"
                        autoComplete="repeatPassword"
                        value={repeatPass}
                        onChange={onRepeatPasswordChange}

                        error={Boolean(passError)}
                        helperText={passError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox required value="allowExtraEmails" color="primary" />}
                        label="Akceptuję warunki"
                    />
                </Grid>
            </Grid>
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