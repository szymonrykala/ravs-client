import React from 'react';
import FormPage from "../FormPage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Form from "./Form";


export default function Register() {
    return (
        <FormPage
            title='Rejestracja'
            icon={<AccountCircleIcon />}
        >
            <Form />
        </FormPage>
    );
}