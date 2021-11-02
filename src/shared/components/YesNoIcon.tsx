import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function YesNoIcon({
    value
}: { value: boolean }) {
    return (
        value ?
            <CheckCircleOutlineIcon color="success" />
            : <CancelIcon sx={{ color: "red" }} />
    )
}