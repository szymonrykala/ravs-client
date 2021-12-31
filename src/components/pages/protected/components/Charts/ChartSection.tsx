import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";


interface ChartSectionProps {
    title: string,
    children: React.ReactNode[] | React.ReactNode,
    defaultOpen?: boolean,
}


export default function ChartSection(props: ChartSectionProps) {
    const [open, setOpen] = React.useState<boolean>(props?.defaultOpen ? true : false);

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography variant='h6' component='h5' id={props.title.replace(' ', '_')}>
                    {props.title}
                    <IconButton onClick={() => setOpen(old => !old)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Typography>
            </Box>
            <Collapse in={open} timeout="auto" >
                <Grid container spacing={2}>
                    {props.children}
                </Grid>
                <br />
                <Divider />
            </Collapse>
        </Box>
    );
}