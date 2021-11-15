import { Typography } from "@mui/material";
import Building from "../../../models/Building";
import AppLink from "../AppLink";
import ScrollableListItem from "./ScrollableListItem";


interface ScrollableBuildingListItemProps {
    building: Building
}


export default function ScrollableBuildingListItem({ building }: ScrollableBuildingListItemProps) {
    return (
        <ScrollableListItem
            id={building.name}
            primary={<>
                <AppLink withIcon to={`./${building.address}/buildings/${building.id}`}>
                    {building.name}&nbsp;
                </AppLink>
            </>}
            secondary={<>
                <Typography variant='body2'>
                    Godziny otwarcia: <br />
                    od&nbsp;{building.openTime} <br />
                    do&nbsp;{building.closeTime}
                </Typography>
            </>}
        />
    );
}