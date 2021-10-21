import FormPage from "./FormPage";
import RemindPassowordForm from "./Forms/RemindPassowordForm";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';



export default function RemindPasswordPage() {
    return (
        <FormPage
            title="Zmiana Hasła"
            icon={<AppRegistrationIcon />}
        >
            <RemindPassowordForm />
        </FormPage>
    );
}