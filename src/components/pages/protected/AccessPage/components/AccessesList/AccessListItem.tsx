import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@mui/material";



interface AccessListItemProps {
    id: number,
    name: string,
    onSelect: () => void,
    onDelete: () => void
}


export default function AccessListItem(props: AccessListItemProps) {
    return (
        <ListItem button onClick={props.onSelect} sx={{ my: '5px' }}>
            <ListItemAvatar>
                {props.id}
            </ListItemAvatar>

            <ListItemText primary={props.name} />

            <ListItemSecondaryAction>
                <IconButton
                    color='error'
                    onClick={props.onDelete}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}