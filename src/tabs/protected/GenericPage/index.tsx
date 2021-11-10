import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';


interface GenericPageProps {
  label: string,
  view?: React.ReactNode | null,
  edit?: React.ReactNode | null,
  reservations?: React.ReactNode | null,
  stats?: React.ReactNode | null,
  logs?: React.ReactNode | null,
}


interface TabPanelListItem {
  name: string,
  component: React.ReactNode
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

  const tabPanels = React.useMemo(() => {
    console.info("GenericPage: ponowne rozliczanie dostępu do komponentów");

    const panels: TabPanelListItem[] = [
      { name: 'rezerwacje', component: props.reservations },
      { name: 'statystyki', component: props.stats },
      { name: 'logi', component: props.logs },
    ].filter(({ component }) => component);

    return panels;
  }, []);



  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Box sx={{
        bgcolor: 'background.paper',
        borderRadius: (theme) => theme.shape.borderRadius,
        p: 2.5,
        mb: 2
      }}>
        {props.view}
      </Box>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        variant="scrollable"
        aria-label="Strona z budynkiem, pokojem, salą, adresem, logami, rezerwacjami i wykresami "
        sx={{ borderBottom: 2, borderColor: 'divider' }}
      >
        {tabPanels.map((item, index) => <Tab key={index} label={item.name} {...a11yProps(index)} />)}

      </Tabs>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        {
          tabPanels.map((item, index) => <TabPanel
            key={index}
            value={tabIndex}
            index={index}
            dir={theme.direction}
          >
            {item.component}
          </TabPanel>)
        }
      </SwipeableViews>
    </>
  );
}
