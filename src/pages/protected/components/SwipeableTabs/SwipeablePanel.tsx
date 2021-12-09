import { Box } from "@mui/material";
import React from "react";
import SmallCard from "../../../../shared/components/SmallCard";


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    hidden: boolean,
    index: number
}


export default function SwipeablePanel(props: TabPanelProps) {
    const { children, hidden, index, ...other } = props;

    // should component update
    const render = React.useMemo(() =>
        <Box
            role="tabpanel"
            hidden={hidden}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <SmallCard>{children}</SmallCard>
        </Box>
        , [hidden, index, children, other]);

    return render;
}