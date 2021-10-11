import { Typography } from "@mui/material";


export default function Copyright() {
    return (
        <Typography
            align="center"
            sx={{
                backgroundColor: "primary.dark",
                padding: '15px 0px',
                color: "primary.light"
            }}
        >
            &copy; Szymon Rykała 2021
        </Typography>
    );
}