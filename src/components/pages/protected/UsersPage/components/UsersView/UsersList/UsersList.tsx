import React from 'react';
import { ListItem, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import { useUsers } from "../../../UsersContext";
import UserListItem from "./UserListItem";



export default function UsersList() {
    const { users } = useUsers();

    return (
        <List>
            {
                users.length === 0 && <ListItem>
                    <ListItemText primary='Brak użytkowników spełniających kryteria' />
                </ListItem>
            }
            {
                users.map((item) => <UserListItem key={item.id} user={item} />)
            }
        </List>
    );
}

