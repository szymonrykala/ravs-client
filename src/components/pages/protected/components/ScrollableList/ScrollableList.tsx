import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useResolvedAccess from "../../hooks/useResolvedAccess";


interface ScrollableListProps {
    onAddItem: () => void,
    children: React.ReactNode[] | React.ReactNode,
}


export default function ScrollableList(props: ScrollableListProps) {
    const { premisesAdmin } = useResolvedAccess();

    return (
        <Box>
            <List sx={{
                minHeight: '160px',
                maxHeight: '400px'
            }}>
                {premisesAdmin &&
                    <ListItem button onClick={props.onAddItem}>
                        <ListItemIcon >
                            <AddCircleIcon color='primary' />
                        </ListItemIcon>
                        <ListItemText primary='Dodaj element' />
                    </ListItem>
                }
                {props.children}
            </List>
        </Box>
    )
}


