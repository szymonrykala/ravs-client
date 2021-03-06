import React from "react";
import { ListItemIcon, Menu, MenuItem, SxProps, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/system";


interface MoreVertMenuProps {
    options: { action: () => void, icon?: React.ReactNode, label: string }[],
    sx?: SxProps
}

export default function MoreVertMenu(props: MoreVertMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={props.sx}>
            <IconButton
                aria-label='more-options'
                aria-controls="card-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                MenuListProps={{
                    'aria-labelledby': 'more-options',
                }}
                anchorEl={anchorEl}
                id="card-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        minWidth: 200,
                        maxWidth: '100%'
                    }
                }}
            >
                {
                    props.options.map((opt, id) => <MenuItem
                        key={id}
                        onClick={() => {
                            opt.action();
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            {opt.icon}
                        </ListItemIcon>
                        <Typography>{opt.label}</Typography>
                    </MenuItem>)
                }
            </Menu>
        </Box>
    );
}

