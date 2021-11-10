import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

import SyncIcon from '@mui/icons-material/Sync';
import React from "react";
import UserService from "../../../services/UserService";
import { statusReducer } from "./statusReducer";


interface UniqueCodeButtonProps {
    email: string,
    text: string
}


function resolveColor(value: null | boolean): string {
    if (value === null) return "inherit";
    if (value === true) return "green";
    return "red";
}


export default function UniqueCodeButton(props: UniqueCodeButtonProps) {
    const [result, dispatchResult] = React.useReducer(statusReducer, {
        success: null,
        message: props.text
    });

    const handleSubmit = async () => {
        if (!props.email) {
            dispatchResult({ statusCode: "NO_ADDRESS" });
        }
        try {
            const resp = await UserService.generateKey(props.email);
            dispatchResult(resp);

        } catch (err: any) {
            dispatchResult({
                statusCode: err.statusCode,
                payload: err.error.description
            });
        }
    };

    return (
        <Box
            component="div"
            display="flex"
        >
            <Button sx={{
                bgcolor: "primary.50",
                "&:hover": {
                    bgcolor: "primary.100",
                }
            }}
                onClick={handleSubmit} >
                <SyncIcon fontSize="large" />
            </Button>

            <Box
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    ml: 1
                }}
            >
                <Typography
                    variant="body2"
                    component="p"
                    color={resolveColor(result.success)}
                >
                    {result.message}
                </Typography>
            </Box>

        </Box>
    );
}