import FormPage from "./FormPage";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ActivationForm from "./Forms/ActivationForm";


export default function ActivationPage(){ 
    return(
        <FormPage
        title='Aktywacja konta'
        icon={<LockOpenIcon />}
    >
        <ActivationForm/>
    </FormPage>
    );
}