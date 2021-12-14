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
                users.map((item, index) => <UserListItem key={index} user={item} />)
            }
        </List>
    );
}

