import { Avatar, Link, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import User from "../../../../../models/User";
import ImageService from "../../../../../services/ImageService";
import { dynamicPaths } from "../../../../../shared/path";



interface UserItemProps {
    user: User
}

export default function UserItem({
    user
}: UserItemProps) {
    return (
        <ListItem button component={Link} href={dynamicPaths.toUser(user.id)}>
            <ListItemAvatar>
                <Avatar
                    src={ImageService.getLink(user.image)}
                    alt={`${user.name} ${user.surname}`}
                />
            </ListItemAvatar>
            <ListItemText
                primary={`${user.name} ${user.surname}`}
                secondary={<>
                    <a
                        onClick={(e) => e.stopPropagation()}
                        aria-label="wyślij email"
                        title="wyślij email"
                        href={`mailto:${user.email}`}
                    >
                        {user.email}
                    </a>
                </>}
            />
        </ListItem>
    );
}