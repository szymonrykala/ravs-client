import React from "react";
import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';


interface MoreVertMenuProps {
    options: { action: () => void, icon?: React.ReactNode, label: string }[]
}

export default function MoreVertMenu(props: MoreVertMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    },[]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label='card-more-button'
                aria-controls="card-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                MenuListProps={{
                    'aria-labelledby': 'card-more-button',
                }}
                anchorEl={anchorEl}
                id="card-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                {
                    props.options.map((opt, id) => <MenuItem
                        key={id}
                        onClick={handleClose}
                    >
                        <ListItemIcon>
                            {opt.icon}
                        </ListItemIcon>
                        <Typography onClick={opt.action}>{opt.label}</Typography>
                    </MenuItem>)
                }
            </Menu>
        </div>
    );
}

