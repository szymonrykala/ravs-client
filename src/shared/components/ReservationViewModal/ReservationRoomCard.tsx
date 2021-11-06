import { Card, CardHeader, CardContent, Typography, Box, CardMedia } from "@mui/material";
import ImageService from "../../../services/ImageService";
import { Link as RouterLink } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import Room from "../../../models/Room";
import React from "react";
import { useResourceMap } from "../../../contexts/ResourceMapContext";
import AppLink from "../AppLink";



interface ReservationRoomCardProps {
    room: Room
}

export default function ReservationRoomCard({ room }: ReservationRoomCardProps) {
    const { getRoomLink, getBuildingLink } = useResourceMap();

    const roomLink = React.useMemo(() => getRoomLink(room.id), [room.id]);
    const buildingLink = React.useMemo(() => getBuildingLink(room.building), [room.building]);

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component='img'
                image={ImageService.getLink(room.image)}
                alt={`zdjęcie sali ${room.name}`}
                sx={{
                    maxWidth: '40%',
                    maxHeight: '100%'
                }}
            />
            <Box sx={{ width: '60%' }}>
                <CardHeader
                    title={`Sala ${room.name}`}
                    subheader={room.roomType}
                    sx={{
                        pt: 1, pb: 0
                    }}
                    action={
                        <RouterLink
                            to={roomLink}
                            aria-label='Otwórz stronę Pokoju'
                        >
                            <LaunchIcon />
                        </RouterLink>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <AppLink to={buildingLink}>pokaż budynek</AppLink>
                        Aktualnie {room.occupied ? 'zajęta' : 'wolna'}<br />
                        Piętro&nbsp;{room.floor}<br />
                    </Typography >
                </CardContent >
            </Box >
        </Card >
    );
}