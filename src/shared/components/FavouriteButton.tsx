import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { FavouriteBuilding, FavouriteRoom } from '../../models/Metadata';
import MetadataService from '../../services/MetadataService';



interface FavouriteButtonProps {
    data: FavouriteBuilding | FavouriteRoom
}


export default function FavouriteButton(props: FavouriteButtonProps) {
    const [marked, setMarked] = React.useState(false);

    React.useEffect(() => {
        setMarked(MetadataService.isFavourite(props.data));
    }, [props.data]);


    const addToFavourites = React.useCallback(() => {
        if (marked) {
            MetadataService.removeFavourite(props.data);
        } else {
            MetadataService.addFavourite(props.data);
        }

        setMarked(old => !old);
    }, [
        marked,
        props.data,
    ]);


    return (
        <IconButton sx={{display:'inline'}} onClick={addToFavourites} color='warning'>
            {marked ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
    );
}