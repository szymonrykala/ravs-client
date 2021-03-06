import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link as ReactRouterLink, Redirect } from 'react-router-dom';
import paths from '../../../../shared/path';
import UserService, { ActivationData } from '../../../../services/UserService';
import UniqueCodeButton from '../../../../shared/components/UniqueCodeButton';
import useNotification from '../../../../contexts/NotificationContext/useNotification';



export default function Form() {
    const notify = useNotification();

    const [data, setData] = React.useState<ActivationData>({
        email: localStorage.getItem('email')?.toString() ?? '',
        password: '',
        code: ''
    })

    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await UserService.activate(data);
            notify("Twoje konto zostało aktywowane", 'success',
                () => <Redirect to={paths.LOGIN} />
            );
        } catch (err: any) {
            let message = err.description;
            if (err.code === 404) message = "Taki użytkownik nie istnieje";

            notify(message, 'error');
        }
    }, [notify, data]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setData(old => ({ ...old, [e.target.name]: e.target.value }))
    }, []);

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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