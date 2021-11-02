import { Avatar, Link, Typography } from "@mui/material";
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
                padding: '15px',
                color: 'primary.dark'
            }}
        >
            <Avatar
                alt={`${user?.name} ${user?.surname}`}
                src={ImageService.getLink(user?.image)}
                sx={{
                    width: '96px',
                    height: '96px',
                    fontSize: '36px',
                    margin: '15px auto',
                    backgroundColor: 'primary.main'
                }}
            />
            <Typography>
                {user?.name}&nbsp;{user?.surname}
            </Typography>
            <Typography>
                <Link href={`mailto:${user?.email}`}>
                    {user?.email}
                </Link>
            </Typography>
        </Box>
    );
}