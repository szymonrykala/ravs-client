import { Card, CardHeader, Avatar, CardContent, Typography, Link } from "@mui/material";
import User from "../../../../../models/User";
import ImageService from "../../../../../services/ImageService";
import { displayDate } from "../../../../../shared/utils";
import { Link as RouterLink } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { dynamicPaths } from "../../../../../shared/path";


interface ReservationUserCardProps {
    user: User
}

export default function ReservationUserCard({ user }: ReservationUserCardProps) {
    return (
        <Card aria-label="Rezerwujący użytkownik" sx={{ minHeight: '150px' }}>
            <CardHeader
                avatar={<Avatar
                    sx={{ width: 56, height: 56 }}
                    alt={`${user.name} ${user.surname}`}
                    src={ImageService.getLink(user.image)}
                />}
                title={`${user.name} ${user.surname}`}
                subheader={
                    <Link
                        aria-label="wyślij email"
                        title="wyślij email"
                        href={`mailto:${user.email}`}
                    >
                        {user.email}
                    </Link>
                }
                action={
                    <RouterLink
                        to={dynamicPaths.toUser(user.id)}
                        aria-label='Pokaż użytkownika'
                        title='Pokaż użytkownika'
                    >
                        <LaunchIcon />
                    </RouterLink>
                }
            />
            <CardContent>
                <Typography
                    variant="body2"
                    fontSize="smaller"
                    color='text.secondary'
                    aria-label='Data ostatniej aktywności'
                    title='Data ostatniej aktywności'
                >
                    Ostatnia aktywność: {displayDate(user.lastActivity)}
                </Typography>
            </CardContent>
        </Card>
    );
}
