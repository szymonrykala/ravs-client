import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UniqueCodeButton from "../../../../shared/components/UniqueCodeButton";
import React from "react";
import FormStep from "./FormStep";
import { remindPasswordReducer } from "./remindPasswordReducer";
import UserService, { ChangePasswordData } from "../../../../services/UserService";
import { initialReducerResult } from "../../../../shared/reducreInterfaces";
import { Redirect, Link as ReactRouterLink } from 'react-router-dom';
import paths from "../../../../shared/path";


export default function RemindPassowordForm() {
    const [result, dispatchResult] = React.useReducer(
        remindPasswordReducer,
        initialReducerResult
    );

    const [data, setData] = React.useState<ChangePasswordData>({
        email: localStorage.getItem('email')?.toString() ?? '',
        newPassword: '',
        code: ''
    });


    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const resp = await UserService.changePassword(data);
            dispatchResult(resp);
        } catch (err: any) {
            dispatchResult({
                statusCode: err.statusCode,
                payload: err.error.description
            })
        }

    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {result.success && <Redirect to={paths.LOGIN} />}
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
            <Typography sx={{ mt: "15px", color: result.success ? "green" : "red" }}>
                {result.message}
            </Typography>
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