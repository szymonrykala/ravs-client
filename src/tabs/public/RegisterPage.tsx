import FormPage from "./FormPage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RegisterForm from "./Forms/RegisterForm";


export default function RegisterPage() {
    return (
        <FormPage
            title='Rejestracja'
            icon={<AccountCircleIcon />}
        >
            <RegisterForm />
        </FormPage>
    );
}