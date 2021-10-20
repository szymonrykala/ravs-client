import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import SyncIcon from '@mui/icons-material/Sync';
import React from "react";
import UserService from "../../../services/UserService";
import useSession from "../../../auth/useSession";


interface UniqueCodeButtonProps {
    email: string,
    text: string
}

interface ButtonStatus {
    success: null | boolean,
    message: string
}


function resolveColor(value: null | boolean): string {
    if (value === null) return "";
    if (value === true) return "green";
    return "red";
}


const EMAIL_SEND: ButtonStatus = {
    success: true,
    message: "Kod został wysłany na podany email"
};

const ERROR: ButtonStatus = {
    success: false,
    message: "Coś poszło nie tak, przepraszamy."
};

const UNCORRECT_EMAIL: ButtonStatus = {
    success: false,
    message: "Format adresu email jest niepoprawny."
};

const NO_ADDRESS_PROVIDED: ButtonStatus = {
    success: null,
    message: "Wpisz adres email na który wysłać wiadomość."
};



export default function UniqueCodeButton(props: UniqueCodeButtonProps) {
    const [data, setData] = React.useState<ButtonStatus>({
        success: null,
        message: props.text
    });

    const handleSubmit = async () => {
        if (props.email) {
            try {
                await UserService.generateKey(props.email);
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