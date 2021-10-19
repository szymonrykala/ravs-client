import BungalowIcon from '@mui/icons-material/Bungalow';
import MapIcon from '@mui/icons-material/Map';


import { List } from "@mui/material";
import React from "react";
import AddressMap from "../../../../models/AddressMap";
import AddressService from "../../../../services/AddressService";
import CollapseableListItem from "./CollapseableListItem";
import RoomListItem from "./RoomListItem";


interface ResourcesList {

}


export default function ResourcesList({ }: ResourcesList) {
    const [resources, setResources] = React.useState<AddressMap[]>();

    React.useEffect(() => {
        AddressService.getResourcesMap()
            .then(setResources);
    }, [])


    return (
        <List>
            {resources?.map(({ id, name, href, buildings }) =>
                <CollapseableListItem
                    key={id}
                    name={name}
                    href={`/app${href}`}
                    icon={<MapIcon color="primary"/>}
                >
                    {buildings.map(({ id, name, href, rooms }) =>
                        <CollapseableListItem
                            key={id}
                            name={name}
                            href={`/app${href}`}
                            icon={<BungalowIcon color="primary"/>}
                            sx={{
                                pl: 4,
                                backgroundColor: 'secondary.dark'
                            }}
                        >
                            {rooms.map((roomEntry, key) => <RoomListItem key={key} {...roomEntry} />)}

                        </CollapseableListItem>)}

                </CollapseableListItem>)}

        </List>
    );
}
