import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListItem from "@mui/material/ListItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";



interface AddItemProps {
    onClick: () => void
}


export default function AddItem(props: AddItemProps) {
    return (
        <ListItem disablePadding >
            <ListItemButton onClick={props.onClick}>
                <ListItemIcon>
                    <AddCircleIcon color="primary" />
                </ListItemIcon>

                <ListItemText secondary='Dodaj nową klasę dostępu' />
            </ListItemButton>
        </ListItem>
    );
}