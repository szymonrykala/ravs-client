import { IconButton, Link, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import useSession from "../../../../auth/useSession";
import { FavouriteBuilding, FavouriteRoom, FavType } from "../../../../models/Metadata";
import MetadataService from "../../../../services/MetadataService";
import SmallCard from "../components/SmallCard";
import { dynamicPaths } from "../../../../shared/path";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


function getCorrectListItem(data: FavouriteBuilding | FavouriteRoom): React.ReactNode {
    switch (data.type) {
        case FavType.Building: {
            const { addressId, id, name } = data as FavouriteBuilding;
            return <ListItemText key={name + id} primary={<Link href={dynamicPaths.toBuilding(addressId, id)}>Budynek {name}</Link>} />
        }
        case FavType.Room: {
            const { addressId, buildingId, id, name } = data as FavouriteRoom;
            return <ListItemText key={name + id} primary={<Link href={dynamicPaths.toRoom(addressId, buildingId, id)}>Sala {name}</Link>} />
        }
        default: return null;
    }
}


export default function Favourites() {
    const { user } = useSession();

    const [data, setData] = React.useState<(FavouriteBuilding | FavouriteRoom)[]>()


    React.useEffect(() => {
        setData(MetadataService.favourites);
    }, [user])

    const handleRemoveFavourite = React.useCallback((item: FavouriteBuilding | FavouriteRoom) => {
        MetadataService.removeFavourite(item);
        setData(MetadataService.favourites);
    }, []);

    return (
        <SmallCard title='Ulubione'>
            <List>
                {
                    data?.map((item,key) => <ListItem disablePadding key={key}>
                        {getCorrectListItem(item)}
                        <IconButton
                            onClick={() => handleRemoveFavourite(item)}
                            size='small'>
                            <RemoveCircleOutlineIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                    )
                }
                {
                    data?.length === 0 &&
                    <ListItemText color='text.secondary' primary='Brak ulubionych' />
                }
            </List>
        </SmallCard>
    )
}


