import BungalowIcon from '@mui/icons-material/Bungalow';
import MapIcon from '@mui/icons-material/Map';

import { List } from "@mui/material";
import { useResourceMap } from '../../../../contexts/ResourceMapContext';
import paths from '../../../path';
import CollapseableListItem from "./CollapseableListItem";
import RoomListItem from "./RoomListItem";


export default function ResourcesList() {
    const { resourceMap } = useResourceMap();
    return (
        <List>
            {resourceMap?.map(({ id, name, href, buildings }) =>
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
