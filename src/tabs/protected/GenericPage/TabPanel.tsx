import { Box } from "@mui/material";
import React from "react";
import Panel from "./Panel";


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    hidden: boolean,
    key: number
}


export default function TabPanel(props: TabPanelProps) {
    const { children, hidden, key, ...other } = props;

    // should component update
    const render = React.useMemo(() =>
        <Box
            role="tabpanel"
            hidden={hidden}
            id={`full-width-tabpanel-${key}`}
            aria-labelledby={`full-width-tab-${key}`}
            {...other}
        >
            <Panel>
                {children}
            </Panel>
        </Box>
        , [hidden, key, children, other]);

    return render;
}