import FormPage from "./FormPage";
import LoginForm from "./Forms/LoginForm";
import LoginIcon from '@mui/icons-material/Login';



export default function LoginPage() {
    return (
        <FormPage
            title='Logowanie'
            icon={<LoginIcon />}
        >
            <LoginForm />
        </FormPage>
    );
}