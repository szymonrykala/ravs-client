import FormPage from "../FormPage";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Form from "./Form";


export default function ActivationPage(){ 
    return(
        <FormPage
        title='Aktywacja konta'
        icon={<LockOpenIcon />}
    >
        <Form/>
    </FormPage>
    );
}