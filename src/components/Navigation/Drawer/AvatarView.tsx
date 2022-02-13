import React from 'react';
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SessionUser } from "../../../models/User";
import ImageService from "../../../services/ImageService";


interface AvatarViewProps {
    user: SessionUser | null,
}


export default function AvatarView({
    user
}: AvatarViewProps) {
    return (
        <Box
            onClick={(ev) => ev.stopPropagation()}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                color: 'primary.dark'
            }}
        >
            <Avatar
                alt={`${user?.name} ${user?.surname}`}
                src={ImageService.getLink(user?.image)}
                sx={{
                    width: '120px',
                    height: '120px',
                    fontSize: '36px',
                    mt: 2,
                    mb: 2,
                }}
            />
            <Typography>
                {user?.name}&nbsp;{user?.surname}
            </Typography>
            <Typography>
                <a href={`mailto:${user?.email}`}>
                    {user?.email}
                </a>
            </Typography>
        </Box>
    );
}