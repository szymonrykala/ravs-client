import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import Panel from './Panel';


interface GenericPageProps {
	pages: { name: string, component: React.ReactNode }[],
	view?: React.ReactNode | null,
}

function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}



export default function GenericPage(props: GenericPageProps) {
	const theme = useTheme();
	const [tabIndex, setTabIndex] = React.useState(0);


	const handleTabChange = React.useCallback((event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	}, []);


	const handleChangeIndex = React.useCallback((index: number) => {
		setTabIndex(index);
	}, []);


	const renderedTabs = React.useMemo(() => {
		return props.pages.map((page, index) => <Tab key={index} label={page.name} {...a11yProps(index)} />)
	}, [props.pages]);


	const renderedTabPanels = React.useMemo(() => {
		return props.pages.map((page, index) => <TabPanel
			key={index}
			index={index}
			hidden={tabIndex !== index}
			dir={theme.direction}
		>
			{page.component}
		</TabPanel>)
	}, [props.pages, tabIndex]);


	const renderedView = React.useMemo(() => {
		return props.view ? <Panel>{props.view}</Panel> : null
	}, [props.view]);


	return (
		<>
			{renderedView}

			<Tabs
				value={tabIndex}
				onChange={handleTabChange}
				indicatorColor="primary"
				variant="scrollable"
				aria-label="Strona z budynkiem, pokojem, salą, adresem, logami, rezerwacjami i wykresami "
				sx={{ borderBottom: 2, borderColor: 'divider' }}
			>
				{renderedTabs}
			</Tabs>

			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={tabIndex}
				onChangeIndex={handleChangeIndex}
			>
				{renderedTabPanels}
			</SwipeableViews>
		</>
	);
}
