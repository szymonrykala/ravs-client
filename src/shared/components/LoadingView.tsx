import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system";


interface ContextLoaderProps {
    open: boolean,
    text?: string,
    sx?: SxProps
}

export default function LoadingView(props: ContextLoaderProps) {
    return (
        <Backdrop
            sx={{
                display: 'flex',
                flexDirection: 'column',
                color: 'primary.main',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor:'background.default',
                ...props.sx
            }}
            open={props.open}
        >
            <Typography variant="h5" pb={2}>
                {props.text}
            </Typography>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}