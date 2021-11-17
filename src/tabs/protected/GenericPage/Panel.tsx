import Box from "@mui/material/Box";



interface PanelProps {
    children: React.ReactNode | React.ReactNode[]
}

export default function Panel(props: PanelProps) {
    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                borderRadius: (theme) => theme.shape.borderRadius,
                mt: 1.5,
                p: '2vw'
            }}
        >
            {props.children}
        </Box>
    );
}