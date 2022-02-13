import React from 'react';
import { Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import User from "../../../../../../../models/User";
import ImageService from "../../../../../../../services/ImageService";
import { dynamicPaths } from "../../../../../../../shared/path";



interface UserListItemProps {
    user: User
}

export default function UserListItem({ user }: UserListItemProps) {
    return (
        <ListItem button
            component={Link}
            href={dynamicPaths.toUser(user.id)}
        >
            <ListItemAvatar
                title={user.email}
                aria-label={user.email}
            >
                <Avatar src={ImageService.getLink(user.image)} />
            </ListItemAvatar>
            <ListItemText
                primary={`${user.name} ${user.surname}`}
                secondary={
                    <>
                        {user.email}
                    </>
                }
            />
        </ListItem>
    );
}