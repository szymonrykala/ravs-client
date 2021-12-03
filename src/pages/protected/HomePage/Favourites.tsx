import { List, ListItemText } from "@mui/material";
import React from "react";
import useSession from "../../../auth/useSession";
import { FavouriteBuilding, FavouriteRoom, FavType } from "../../../models/Metadata";
import MetadataService from "../../../services/MetadataService";
import AppLink from "../../../shared/components/AppLink";
import SmallCard from "../../../shared/components/SmallCard";
import { dynamicPaths } from "../../../shared/path";




function getCorrectListItem(data: FavouriteBuilding | FavouriteRoom): React.ReactNode {
    switch (data.type) {
        case FavType.Building: {
            const { addressId, id, name } = data as FavouriteBuilding;
            return <ListItemText key={name + id} primary={<AppLink withIcon to={dynamicPaths.toBuilding(addressId, id)}>Budynek {name}</AppLink>} />
        }
        case FavType.Room: {
            const { addressId, buildingId, id, name } = data as FavouriteRoom;
            return <ListItemText key={name + id} primary={<AppLink withIcon to={dynamicPaths.toRoom(addressId, buildingId, id)}>Sala {name}</AppLink>} />
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


    return (
        <SmallCard title='Ulubione'>
            <List>
                {
                    data?.map(item => getCorrectListItem(item))
                }
                {
                    data?.length === 0 &&
                    <ListItemText color='text.secondary' primary='Brak ulubionych' />
                }
            </List>
        </SmallCard>
    )
}


