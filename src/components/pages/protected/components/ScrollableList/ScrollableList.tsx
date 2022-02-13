import { Button, List } from "@mui/material";
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
        <Box >
            {premisesAdmin && 
                <>
                    <br />
                    <Button
                        startIcon={<AddCircleIcon color='primary' />}
                        onClick={props.onAddItem}>
                        Dodaj element
                    </Button>
                </>
            }
            <List
                sx={{
                    minHeight: '100px',
                    maxHeight: '270px',
                    overflow: 'auto'
                }}
            >
                {props.children}
            </List>
        </Box>
    )
}


