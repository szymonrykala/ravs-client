import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import User from "../../../../../../models/User";
import ImageService from "../../../../../../services/ImageService";
import AppLink from "../../../../../../shared/components/AppLink";
import { dynamicPaths } from "../../../../../../shared/path";
import { displayDate } from "../../../../../../shared/utils";



interface UserListItemProps {
    user: User
}

export default function UserListItem({ user }: UserListItemProps) {
    return (
        <TableRow >
            <TableCell align="left">
                <ListItem component='div'>
                    <ListItemAvatar
                        title={user.email}
                        aria-label={user.email}
                    >
                        <AppLink to={dynamicPaths.toUser(user.id)}>
                            <Avatar src={ImageService.getLink(user.image)} />
                        </AppLink>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<AppLink to={dynamicPaths.toUser(user.id)}>
                            {user.name} {user.surname}
                        </AppLink>
                        }
                        secondary={user.email}
                    />
                </ListItem>
            </TableCell>
            <TableCell sx={{
                width: 'fit-content'
            }}>
                {displayDate(user.lastActivity)}
            </TableCell>
        </TableRow>
    );
}