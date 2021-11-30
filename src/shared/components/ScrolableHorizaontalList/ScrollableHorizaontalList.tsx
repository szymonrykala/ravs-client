import { List } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import { AddItemButton } from ".";


interface ScrollableHorizaontalListProps {
    onAddItem: () => void,
    children: React.ReactNode[] | React.ReactNode,
}


export default function ScrollableHorizaontalList(props: ScrollableHorizaontalListProps) {
    return (
        <Box>
            <List sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: 'background.default',
                justifyItems: 'flex-start',
                overflow: 'auto',
                padding: '15px',
                minHeight: '160px',
            }}>
                {props.children}
                <AddItemButton
                    onClick={props.onAddItem}
                />
            </List>
        </Box>
    )
}


