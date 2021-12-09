import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AppLink from "../../../../shared/components/AppLink";


interface ScrollableListItemProps {
    primary: string | React.ReactNode,
    link: string,
}


export default function ScrollableListItem(props: ScrollableListItemProps) {
    return (
        <ListItem sx={{ py: '2px' }}>
            <ListItemIcon>
                <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={<AppLink withIcon to={props.link}>{props.primary}</AppLink>} />
        </ListItem>
    );
}