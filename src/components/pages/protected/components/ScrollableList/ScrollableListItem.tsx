import { Link, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';


interface ScrollableListItemProps {
    primary: string | React.ReactNode,
    link: string,
}


export default function ScrollableListItem(props: ScrollableListItemProps) {
    return (
        <ListItem button
            component={Link}
            href={props.link}
            sx={{ py: '2px' }}
        >
            <ListItemIcon>
                <LinkIcon />
            </ListItemIcon>
            <ListItemText primary={props.primary} />
        </ListItem>
    );
}