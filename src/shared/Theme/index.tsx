import React from 'react';
import { ThemeProvider } from '@mui/material/styles';


import theme from './theme';


interface ThemeProps {
    children: React.ReactNode
}


export default function Theme(props: ThemeProps) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}