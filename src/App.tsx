import { Box, Container, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';

import Theme from './shared/Theme';
import SessionProvider from './auth/sessionProvider'
import Tabs from './pages';
import Footer from './shared/components/Footer';
import { BrowserRouter } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NotificationContextProvider from './contexts/NotificationContext/NotificationContextProvider';
import { ResourceMapContextProvider } from './contexts/ResourceMapContext';
import Navigation from './shared/components/Navigation';



function App() {
	return (
		<Theme>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<CssBaseline />
				<Box component="div" className="App" sx={{ backgroundColor: 'background.default' }}>
					<BrowserRouter basename='/'>
						<NotificationContextProvider>
							<SessionProvider >
								<ResourceMapContextProvider>
									<Navigation />
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
