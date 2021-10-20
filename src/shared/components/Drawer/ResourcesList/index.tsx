import BungalowIcon from '@mui/icons-material/Bungalow';
import MapIcon from '@mui/icons-material/Map';

import { List } from "@mui/material";
import AddressMap from "../../../../models/AddressMap";
import paths from '../../../path';
import CollapseableListItem from "./CollapseableListItem";
import RoomListItem from "./RoomListItem";


interface ResourcesList {
    resourcesMap: AddressMap[]
}


export default function ResourcesList({
    resourcesMap
}: ResourcesList) {
    return (
        <List>
            {resourcesMap?.map(({ id, name, href, buildings }) =>
                <CollapseableListItem
                    key={id}
                    name={name}
                    href={`${paths.HOME}${href}`}
                    icon={<MapIcon color="primary" />}
                >
                    {buildings.map(({ id, name, href, rooms }) =>
                        <CollapseableListItem
                            key={id}
                            name={name}
                            href={`${paths.HOME}${href}`}
                            icon={<BungalowIcon color="primary" />}
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
