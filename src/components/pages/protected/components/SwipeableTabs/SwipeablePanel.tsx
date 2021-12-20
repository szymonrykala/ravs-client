import { Box } from "@mui/material";
import React from "react";
import SmallCard from "../../components/SmallCard";


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number
}


export default function SwipeablePanel(props: TabPanelProps) {
    const { children, index, ...other } = props;

    // should component update
    const render = React.useMemo(() =>
        <Box
            role="tabpanel"
            hidden={false}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <SmallCard>{children}</SmallCard>
        </Box>
        , [index, children, other]);

    return render;
}