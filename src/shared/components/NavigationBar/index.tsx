import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import AccountMenu from './AccountMenu';
import useSession from '../../../auth/useSession';
import { Avatar } from '@mui/material';
import paths from '../../path';
import ImageService from '../../../services/ImageService';
import AppLink from '../AppLink';


interface NavigationBarProps {
	toggleDrawer: any
}


export default function NavigationBar(props: NavigationBarProps) {
	const { user } = useSession();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{user && (
						<IconButton
							onClick={props.toggleDrawer}
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
					)}
					<Typography variant="h4" component="h1" sx={{
						flexGrow: 1,
						fontFamily: "Dancing Script, cursive",
					}}>
						<AppLink
							to={user ? paths.HOME : paths.WELCOME}
						>
							Rav System
						</AppLink>
					</Typography>
					{user && (
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<Avatar
									alt={user.name}
									src={ImageService.getLink(user.image)}
									sx={{ width: 42, height: 42 }}
								/>
							</IconButton>
							<AccountMenu
								trigger={anchorEl}
								handleClose={handleClose}
							/>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
