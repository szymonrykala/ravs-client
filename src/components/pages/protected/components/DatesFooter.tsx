import Typography from "@mui/material/Typography";
import Model from "../../../../models/Model";
import { displayDate } from "../../../../shared/utils";



interface DatesFooterProps {
    model: Model
}

export default function DatesFooter(props: DatesFooterProps) {
    return (
        <Typography color="text.secondary" variant='body2' fontSize='smaller'>
            Utworzono: {displayDate(props.model._created)}<br />
            Ostatnia aktualizacja: {displayDate(props.model._updated)}
        </Typography>
    )
}