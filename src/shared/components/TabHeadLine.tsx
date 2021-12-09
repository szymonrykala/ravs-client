import Typography from "@mui/material/Typography";



interface TabHeadLineProps {
    title: string | React.ReactNode,
    subtitle?: string | React.ReactNode,
}


export default function TabHeadLine(props: TabHeadLineProps) {
    return (
        <span>
            <Typography variant='h4' component='h2' color='primary.dark'>
                {props.title}
            </Typography>
            {
                props.subtitle &&
                <Typography variant="body1" color='text.secondary' mt='5px'>
                    {props.subtitle}
                </Typography>
            }
        </span>
    )
}