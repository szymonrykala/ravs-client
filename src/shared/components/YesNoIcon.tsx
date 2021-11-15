import CancelIcon, { } from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


interface YesNoIconProps {
    value: boolean,
    title?: string,
    fontSize?: 'small' | 'medium' | 'large',
}


export default function YesNoIcon(props: YesNoIconProps) {
    const { value, ...rest } = props;

    return (
        value ?
            <CheckCircleOutlineIcon color="success" {...rest} />
            : <CancelIcon sx={{ color: "red" }} {...rest} />
    )
}