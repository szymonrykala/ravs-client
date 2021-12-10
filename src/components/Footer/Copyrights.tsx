import { Typography } from "@mui/material";


export default function Copyright() {
    return (
        <Typography
            align="center"
            sx={{
                backgroundColor: "primary.dark",
                padding: 2,
                color: "primary.light"
            }}
        >
            &copy; Szymon Rykała 2021
        </Typography>
    );
}