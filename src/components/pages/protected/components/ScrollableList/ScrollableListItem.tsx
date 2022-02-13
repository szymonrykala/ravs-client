import { Link, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import React from "react";


interface ScrollableListItemProps {
    primary: string | React.ReactNode,
    link: string,
}


function ScrollableListItem(props: ScrollableListItemProps) {
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

export function EmptyScrollableListItem(props: { text: string }) {
    return (
        <ListItem
            sx={{ py: '2px' }}
        >
            <ListItemText primary={props.text} />
        </ListItem>
    );
}

export default React.memo(ScrollableListItem);