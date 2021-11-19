import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';



interface AddItemProps {
    onClick: () => void
}


export default function AddItem(props: AddItemProps) {
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell colSpan={12} align="left">
                <IconButton onClick={props.onClick}>
                    <AddCircleIcon fontSize='large'/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}