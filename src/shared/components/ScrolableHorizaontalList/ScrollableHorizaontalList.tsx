import { List, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/system/Box";
import React from "react";


interface ScrollableHorizaontalListProps {
    children: React.ReactNode[],
    title: string
}


export default function ScrollableHorizaontalList(props: ScrollableHorizaontalListProps) {
    return (
        <Box>
            <Typography variant="h6" color='text.secondary'>
                {props.title}
            </Typography>

            <List sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: 'background.default',
                justifyItems: 'flex-start',
                borderRadius: ({ shape }) => shape.borderRadius,
                overflow: 'auto',
                padding: '15px',
                minHeight: '160px',
            }}>
                {props.children}
            </List>
        </Box>
    )
}


