import { Container } from '@mui/material';

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
		<div className="App">
			<Theme>
				<SessionProvider>
					<BrowserRouter>
						<NavigationBar toggleDrawer={toggleDrawer} />
						<AppDrawer
							open={open}
							toggleOpen={toggleDrawer}
						/>
						<Container>
							<Tabs />
						</Container>
						<Footer />
					</BrowserRouter>
				</SessionProvider>
			</Theme>
		</div>
	);
}

export default App;
