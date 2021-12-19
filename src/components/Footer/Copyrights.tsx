import { Typography } from "@mui/material";
import React from "react";


function Copyright() {
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

export default React.memo(Copyright);