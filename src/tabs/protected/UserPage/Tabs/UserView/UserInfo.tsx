import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DetailedUser } from "../../../../../models/User";
import { displayDate } from "../../../../../shared/utils";



interface UserInfoProps {
    user: DetailedUser
}

export default function UserInfo({ user }: UserInfoProps) {
    return (
        <span>
            <Typography color='primary.dark' variant='h4' component='h1'>
                {user.name}&nbsp;{user.surname}
            </Typography>

            <Typography color='text.secondary' variant="h6" component={Link} href={`mailto:${user.email}`}>
                {user.email}
            </Typography>
            <Typography color='text.secondary' variant="subtitle1">
                Klasa dostępu: {user.access.name} <br />
                Ostatnio aktywny: {displayDate(user.lastActivity)}
            </Typography>
        </span>
    );
}