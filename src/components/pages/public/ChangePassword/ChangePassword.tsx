import React from 'react';
import FormPage from "../FormPage";
import RemindPassowordForm from "./Form";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';



export default function ChangePassword() {
    return (
        <FormPage
            title="Zmiana Hasła"
            icon={<AppRegistrationIcon />}
        >
            <RemindPassowordForm />
        </FormPage>
    );
}