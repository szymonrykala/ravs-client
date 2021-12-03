import { Button, Grid, Link, TextField } from "@mui/material";
import { Box } from "@mui/system";
import UniqueCodeButton from "../../../shared/components/UniqueCodeButton";
import React from "react";
import FormStep from "./FormStep";
import UserService, { ChangePasswordData } from "../../../services/UserService";
import { Redirect, Link as ReactRouterLink } from 'react-router-dom';
import paths from "../../../shared/path";
import useNotification from "../../../contexts/NotificationContext/useNotification";


interface FormProps {
    onSuccess?: () => void
}

export default function Form(props: FormProps) {
    const notify = useNotification();

    const [data, setData] = React.useState<ChangePasswordData>({
        email: localStorage.getItem('email')?.toString() ?? '',
        newPassword: '',
        code: ''
    });


    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setData(old => ({ ...old, [e.target.name]: e.target.value }));
    }, []);


    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await UserService.changePassword(data);

            if (props.onSuccess) props.onSuccess();

            notify("Hasło zostało zmienione", 'success',
                () => setTimeout(() => <Redirect to={paths.LOGIN} />, 2000)
            );
        } catch (err: any) {
            let message = err.description;
            if (err.code === 404) message = "Taki użytkownik nie istnieje";

            notify(message, 'error');
        }
    }, [data, notify]);

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <FormStep
                title="1. Wygeneruj Kod"
                text="Podaj swój aders email i naciśnij przycisk by otrzymać email i kodem."
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adres email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={data.email}
                    onChange={onChange}
                />
                <UniqueCodeButton
                    text="Kliknij przycisk by otrzymać kod."
                    email={data.email}
                />
            </FormStep>
            <FormStep
                title="2. Podaj nowe hasło i kod"
                text="Podaj nowe hasło i kod który otrzymałeś (jeśli nie, powtórz krok nr 1)"
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="Hasło"
                    type="password"
                    id="password"
                    value={data.newPassword}
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
            </FormStep>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                3. Zmień Hasło
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link component={ReactRouterLink} to={paths.LOGIN} variant="body2" >
                        Hasło zmienione? Zaloguj się!
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}