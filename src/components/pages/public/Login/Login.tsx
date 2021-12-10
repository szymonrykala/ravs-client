import FormPage from "../FormPage";
import Form from "./Form";
import LoginIcon from '@mui/icons-material/Login';



export default function Login() {
    return (
        <FormPage
            title='Logowanie'
            icon={<LoginIcon />}
        >
            <Form />
        </FormPage>
    );
}