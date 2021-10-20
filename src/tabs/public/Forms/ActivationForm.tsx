import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormPage from './FormPage';
import { Typography } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';

import paths from '../../../shared/path';
import { ActivationData } from '../../../services/UserService';
import UniqueCodeButton from '../../../shared/components/UniqueCodeButton';



export default function ActivateForm() {
    const [message, setMessage] = React.useState<string>('');

    const [data, setData] = React.useState<ActivationData>({
        email: localStorage.getItem('email')?.toString() ?? '',
        password: '',
        code: ''
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


    };

    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    return (
        <FormPage
            title='Aktywacja konta'
            icon={<LockOutlinedIcon />}
        >

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
                <Typography>
                    {message}
                </Typography>
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
        </FormPage>
    );
}