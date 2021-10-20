import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import SyncIcon from '@mui/icons-material/Sync';
import React from "react";
import UserService from "../../../services/UserService";
import { ButtonStatus, EMAIL_SEND, ERROR, NO_ADDRESS_PROVIDED, UNCORRECT_EMAIL } from "./statuses";


interface UniqueCodeButtonProps {
    email: string,
    text: string
}



function resolveColor(value: null | boolean): string {
    if (value === null) return "";
    if (value === true) return "green";
    return "red";
}



export default function UniqueCodeButton(props: UniqueCodeButtonProps) {
    const [data, setData] = React.useState<ButtonStatus>({
        success: null,
        message: props.text
    });

    const handleSubmit = async () => {
        if (props.email) {
            try {
                await UserService.generateKey(props.email);
                setData(EMAIL_SEND);

            } catch (err: any) {

                if ([403].includes(err.statusCode)) setData({
                    success: false,
                    message: err.error.description
                })

                else if (err.statusCode === 422) setData(UNCORRECT_EMAIL);
                else setData(ERROR)
            }

        } else {
            setData(NO_ADDRESS_PROVIDED);
        }
    };

    return (
        <Box
            component="div"
            display="flex"
        >
            <Button sx={{
                backgroundColor: "primary.50",
                "&:hover": {
                    backgroundColor: "primary.100",
                }
            }}
                onClick={handleSubmit} >
                <SyncIcon fontSize="large" />
            </Button>

            <Box
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    ml: "5px"
                }}
            >
                <Typography
                    variant="body2"
                    component="p"
                    color={resolveColor(data.success)}
                >
                    {data.message}
                </Typography>
            </Box>

        </Box>
    );
}