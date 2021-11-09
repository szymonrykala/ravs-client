import { Box, Container, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';

import Theme from './shared/Theme';
import SessionProvider from './auth/sessionProvider'
import Tabs from './tabs';
import Footer from './shared/components/Footer';
import NavigationBar from './shared/components/NavigationBar';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import AppDrawer from './shared/components/Drawer';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NotificationContextProvider from './contexts/NotificationContext/NotificationContextProvider';
import { ResourceMapContextProvider } from './contexts/ResourceMapContext';



function App() {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (
		event: React.KeyboardEvent | React.MouseEvent,
		shouldWork: boolean = true
	) => {
		event.stopPropagation();
		if (
			shouldWork &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setOpen(!open);
	};

	return (
		<Theme>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<CssBaseline />
				<Box component="div" className="App" sx={{ backgroundColor: 'secondary.dark' }}>
					<BrowserRouter basename='/'>
						<NotificationContextProvider>
							<SessionProvider >
								<ResourceMapContextProvider>
									<NavigationBar toggleDrawer={toggleDrawer} />
									<AppDrawer
										open={open}
										toggleOpen={toggleDrawer}
									/>
									<Container>
										<Tabs />
									</Container>
									<Footer />
								</ResourceMapContextProvider>
							</SessionProvider>
						</NotificationContextProvider>
					</BrowserRouter>
				</Box>
			</LocalizationProvider>
		</Theme>
	);
}

export default App;
