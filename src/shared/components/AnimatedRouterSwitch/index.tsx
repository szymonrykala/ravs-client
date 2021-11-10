import { Box } from '@mui/system';
import React from 'react';

import { AnimatedSwitch } from 'react-router-transition';
import { mapStyles, routeAnimation } from './animationStyle';
import './transitions.css';


interface TransitionProps {
    children: React.ReactNode | React.ReactNodeArray,
}


export default function AnimatedRouterSwitch(props: TransitionProps) {
    return (
        <Box component={AnimatedSwitch}
            {...routeAnimation}
            mapStyles={mapStyles}
            className="switch-wrapper"
            runOnMount={true}
            sx={{
                // display: 'flex',
                // flexDirection: 'column',
                width: '100%',
                // backgroundColor:"red",
                // position:'relative',
                // alignItems: 'center',
                // height: '100%',
            }}>
            {props.children}
        </Box>
    );
}
