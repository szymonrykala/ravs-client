import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RouterLink from '../../../shared/components/RouterLink';
import FormPage from './FormPage';
import UserService from '../../../services/UserService';
import paths from '../../../shared/path';
import { Link as ReactRouterLink } from 'react-router-dom';


export default function RegisterForm() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // UserService.register({
        //     name: data.get('name').toString(),
        //     surname: data.get('surname').toString(),
        //     email: data.get('email').toString(),
        //     password: data.get('password').toString()
        // })
    };

    return (
        <FormPage
            title='Rejestracja'
            icon={<LockOutlinedIcon />}
        >
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Adres email"
                            name="email"
                            autoComplete="email"
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
        </FormPage>
    );
}