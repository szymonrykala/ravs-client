import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import AddIcon from '@mui/icons-material/Add';



interface AddItemButtonProps {
    onClick: () => void
}


export default function AddItemButton(props: AddItemButtonProps) {
    return (
        <ListItem
            sx={{ width: 'min-content' }}
        >
            <IconButton
                aria-label='Dodaj nowy element'
                title='Dodaj nowy element'
                onClick={props.onClick}
            >
                <AddIcon fontSize='large' color='primary' />
            </IconButton>
        </ListItem>
    );
}