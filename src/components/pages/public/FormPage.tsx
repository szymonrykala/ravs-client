import { Avatar, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";


interface FormPageProps {
    children: React.ReactNode | React.ReactNodeArray,
    title: string,
    icon: React.ReactNode
}


export default function FormPage(props: FormPageProps) {
    return (
        <Container component="div" maxWidth="xs">
            <Box
                sx={{
                    marginTop: '5vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                    padding: '25px',
                    borderRadius: '10px'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    {props.icon}
                </Avatar>
                <Typography component="h1" variant="h5">
                    {props.title}
                </Typography>
                {props.children}
            </Box>
        </Container>
    );
};
