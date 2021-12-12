import { Box, Button, Stack, Typography } from "@mui/material";
import NfcIcon from '@mui/icons-material/Nfc';
import { styled } from "@mui/system";
import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';


interface RfidFormProps {
    headline: string,
    bodyText: string,
    onScan: (keyText: string) => Promise<boolean>,
    onClose: () => void,
}

const HiddenInput = styled('input')({
    position: "absolute",
    left: "-1000px",
    color: "transparent"
});


export default function RfidForm(props: RfidFormProps) {
    const [text, setText] = React.useState<string>('');
    const [color, setColor] = React.useState<string>('primary');
    const input = React.useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        const success = await props.onScan(text);
        if (success) {
            setColor('success');
            setTimeout(handleDecline, 2000);
        } else {
            setColor('error');
        }
        setText('');
    }

    const handleDecline = () => {
        props.onClose();
        setText('');
        setColor('primary');
    }

    const focusOnInput = () => {
        input.current && console.log(input.current.focus())
    }

    return (
        <Stack
            onClick={focusOnInput}
            component="form"
            direction="column"
            spacing={4}
            onSubmit={handleSubmit}
        >
            <NfcIcon
                sx={{ fontSize: 140, alignSelf: "center" }}
                color={color as any}
            />
            <HiddenInput
                ref={input}
                autoFocus
                type="text"
                value={text}
                onChange={(evt: any) => setText(evt.target.value)}
            />
            <Box component="span" textAlign='center'>
                <Typography variant="h5" color='primary.dark'>
                    {props.headline}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt='5px'>
                    {props.bodyText}
                </Typography>
            </Box>

            <Button startIcon={<CancelIcon />}
                onClick={handleDecline}
                color="error"
            >
                Zamknij
            </Button>

        </Stack>
    );
}