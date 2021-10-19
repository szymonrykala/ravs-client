import { Box } from "@mui/material";


interface DrawerPanelProps {
    children: React.ReactNode,
    toggleOpen: any,
}


export default function DrawerPanel({
    children,
    toggleOpen
}: DrawerPanelProps) {
    return (
        <Box
            sx={{ width: 320 }}
            role="presentation"
            onClick={toggleOpen}
            onKeyDown={toggleOpen}
        >
            {children}
        </Box>
    );
}