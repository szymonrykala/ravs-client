import { ListItem, ListItemText } from "@mui/material";


interface ScrollableListItemProps {
    primary: string | React.ReactNode,
    secondary: string | React.ReactNode,
    id?: string
}


export default function ScrollableListItem(props: ScrollableListItemProps) {
    return (
        <ListItem
            id={props.id}
            component='li'
            sx={{
                width: '200px',
                bgcolor: 'background.paper',
                marginRight: '1vw',
                borderRadius: 'inherit',
                alignItems: 'flex-start'
            }}>
            <ListItemText
                primary={props.primary}
                secondary={props.secondary}
            />
        </ListItem>
    );
}