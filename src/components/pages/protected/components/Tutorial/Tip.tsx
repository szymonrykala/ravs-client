import { Popover, Stack, Button, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React from "react";
import StorageService from "../../../../../services/StorageService";
import useTutorial from "./TutorialContext/useTutorial";


interface TipChild {
    children: React.ReactNode | React.ReactNode[],
    text: string,
    priority?: number
}


export default function Tip(props: TipChild) {
    const holder = React.useRef(null);

    const registerTip = useTutorial();
    const [open, setOpen] = React.useState<boolean>(false);
    const [disposeFunc, setDispose] = React.useState<() => void>(() => () => { });

    const observerRef = React.useRef<any>(null);
    const [isOnScreen, setIsOnScreen] = React.useState(false);


    React.useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) =>
            setIsOnScreen(entry.isIntersecting)
        );
    }, [observerRef]);


    React.useEffect(() => {
        observerRef.current.observe(holder.current);

        return () => {
            observerRef.current.disconnect();
        };
    }, [holder, observerRef]);


    React.useEffect(() => {
        const key = props.text.slice(0, 15);

        if (!StorageService.read(key) && isOnScreen) {
            const callback = registerTip(
                () => setTimeout(() => setOpen(true), 300),
                props.priority ?? 1
            );
            setDispose(() => callback);
            StorageService.save(key, true);
        }
    }, [
        props.text,
        props.priority,
        registerTip,
        isOnScreen
    ]);


    const handleClose = React.useCallback(() => {
        disposeFunc();
        setOpen(false);
    }, [disposeFunc]);

    return (
        <span ref={holder}>
            {
                <Popover
                    open={open}
                    anchorEl={holder.current}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                // sx={{
                //     bgcolor: '#44444466',
                //     transition: '0.5s'
                // }}
                // transformOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'left',
                // }}
                >
                    <Stack direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{
                            px: 1,
                            bgcolor: 'warning.light'
                        }}
                    >
                        <ArrowUpwardIcon color='primary' />
                        <Button onClick={handleClose} color='primary'>OK</Button>
                    </Stack>
                    <Typography sx={{ p: 1, maxWidth: '220px',bgcolor: 'warning.light' }}>
                        {props.text}
                    </Typography>
                </Popover>
            }
            {props.children}
        </span >
    );
}