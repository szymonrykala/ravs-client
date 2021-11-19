import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';



interface RowItemProps {
    id: number,
    name: string,
    onSelect: () => void,
    onDelete: () => void
}


export default function RowItem(props: RowItemProps) {
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">{props.id}</TableCell>
            <TableCell align="left">{props.name}</TableCell>
            <TableCell align="left">
                <IconButton onClick={props.onDelete}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={props.onSelect}>
                    <OpenInNewIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}