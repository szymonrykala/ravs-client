import { Tab, Tabs, Typography, useTheme } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import SwipeablePanel from "./SwipeablePanel";


interface SwipeableTabsProps {
    tabs: { name: string, component: React.ReactNode }[],
}


function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


export default function SwipeableTabs(props: SwipeableTabsProps) {
    const theme = useTheme();
    const [tabIndex, setTabIndex] = React.useState(0);


    const handleTabChange = React.useCallback((event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    }, []);


    const handleChangeIndex = React.useCallback((index: number) => {
        setTabIndex(index);
    }, []);


    const renderedTabs = React.useMemo(() => {
        return props.tabs.map((page, index) => <Tab
            key={index}
            label={<Typography component='h2' variant='button'>{page.name}</Typography>}
            {...a11yProps(index)}
        />)
    }, [props.tabs]);


    const renderedTabPanels = React.useMemo(() => {
        return props.tabs.map((page, index) => <SwipeablePanel
            key={index}
            index={index}
            hidden={tabIndex !== index}
            dir={theme.direction}
        >
            {page.component}
        </SwipeablePanel>)
    }, [props.tabs, tabIndex]);


    return (
        <div>
            <Tabs
                allowScrollButtonsMobile
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                variant="scrollable"
                sx={{ borderBottom: 2, borderColor: 'divider' }}
            >
                {renderedTabs}
            </Tabs>
            <br />
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tabIndex}
                onChangeIndex={handleChangeIndex}
            >
                {renderedTabPanels}
            </SwipeableViews>
        </div>
    );
}