import Address from "../../models/Address";
import { styled } from "@mui/system";
import React from "react";
import Box from "@mui/material/Box";



interface MapProps {
    address: Address
}

const StyledIframe = styled('iframe')({
    width: '100%',
    height: '50vh',
    maxHeight: '500px'
});


export default function Map({ address }: MapProps) {

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
    }, []);

    return (
        <Box>
            <StyledIframe
                src={url}
                frameBorder="0"
            />
        </Box>
    );
}