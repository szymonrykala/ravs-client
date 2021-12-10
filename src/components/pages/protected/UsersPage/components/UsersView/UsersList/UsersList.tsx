import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useUsers } from "../../../UsersContext";
import UserListItem from "./UserListItem";



export default function UsersList() {
    const { users } = useUsers();

    return (
        <TableContainer component={Box}>
            <Table aria-label="Tabela rezerwacji" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Użytkownicy</TableCell>
                        <TableCell>Aktywność</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.length === 0 && <TableRow>
                            <TableCell colSpan={12}>
                                <Typography textAlign='center'>
                                    Brak użytkowników spełniających kryteria
                                </Typography>
                            </TableCell>
                        </TableRow>
                    }
                    {
                        users.map((item, index) => <UserListItem key={index} user={item} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

