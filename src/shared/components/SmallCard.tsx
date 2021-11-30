import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";



interface SmallCardProps {
    children: React.ReactNode | React.ReactNode[];
    title?: string,
    titleComponent?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}


export default function SmallCard(props: SmallCardProps) {
    return (
        <Paper elevation={0} sx={{
            p: 2
        }}>
            {props?.title && <Typography variant='body2' component={props.titleComponent ?? 'h2'} color='text.secondary'>
                {props.title}
            </Typography>}
            {props.children}
        </Paper>
    )
}