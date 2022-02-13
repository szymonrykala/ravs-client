import { Typography } from "@mui/material";
import React from 'react';


interface StepProps {
    title: string,
    text?:string,
    children: React.ReactNode | React.ReactNodeArray
}

export default function FormStep(props: StepProps) {
    return (
        <>
            <Typography variant="h5" sx={{ mt: 3 }}>
                {props.title}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
                {props.text}
            </Typography>
            {props.children}
        </>
    );
}