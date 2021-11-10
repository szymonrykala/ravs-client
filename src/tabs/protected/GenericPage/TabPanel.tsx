import { Box } from "@mui/material";


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            sx={{
                bgcolor: "background.paper",
                borderRadius: (theme) => theme.shape.borderRadius,
                mt: 1.5,
                p: 2
            }}
            {...other}
        >
            {children}
        </Box>
    );
}