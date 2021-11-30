import { styled, SxProps } from "@mui/system";
import React from "react";
import Box from "@mui/material/Box";
import Address from "../../../../models/Address";



interface MapProps {
    address: Address,
    sx?: SxProps
}

const StyledIframe = styled('iframe')({
    width: '100%',
    height: '50vh',
    maxHeight: '450px',
    minHeight: '300px'
});


export default function Map({ address, sx }: MapProps) {

    const url = React.useMemo(() => {
        const { street, number, town, country } = address;

        const base = new URL('https://maps.google.com/maps');
        const params = new URLSearchParams({
            q: `${street + " " + number + " " + town + " " + country}`,
            ie: 'UTF8',
            z: '14',
            iwloc: '',
            output: 'embed'
        });
        base.search = params.toString();

        return base.toString();
    }, [address]);

    return (
        <Box>
            <StyledIframe
                src={url}
                frameBorder="0"
                sx={{ ...sx }}
            />
        </Box>
    );
}