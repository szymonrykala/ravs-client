import { Box, Button, ButtonGroup, ButtonGroupProps, Chip, Link, Stack, TextField, Typography } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import React from "react";
import { APIResponse } from "../../../services/interfaces";
import SelectButtonGroup, { SelectButtonInterface } from "../SelectButtonGroup";
import { useLocation } from "react-router-dom";


const predefinedButtons: SelectButtonInterface[] = [
    { name: "tydzień", value: "1 week ago" },
    { name: "miesiąc", value: "1 month ago" },
    { name: "6 miesięcy", value: "6 month ago" },
    { name: "rok", value: "1 year ago" },
];


interface ChartTabBarProps {
    dataSetter: Function,
    dataGetter: (query: any) => Promise<APIResponse>
    links: { name: string, href: string }[]
}


export default function ChartOptionsBar({
    links, dataSetter, dataGetter
}: ChartTabBarProps) {
    const location = useLocation();
    const [customDates, setCustomDates] = React.useState<{ from: Date | null, to: Date | null }>({
        from: new Date(),
        to: new Date()
    });

    const getChartsData = async (queryParams: any) => {
        try {
            const resp = await dataGetter(queryParams); //use provided async getter to get Data
            dataSetter(resp?.data); //set data to parent component state

        } catch (err: any) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        getChartsData({
            from: "1 month ago",
            to: "now"
        });
    }, [location.key]);

    const handleButtonChange = async (buttonValue: string) => {
        await getChartsData({
            from: buttonValue,
            to: "now"
        });
    }

    const handleSubmitCustomDate = async (evt: any) => {
        evt.preventDefault();
        await getChartsData({
            from: customDates.from?.toISOString(),
            to: customDates.to?.toISOString()
        });
    }

    return (
        <Stack direction="column" spacing={2}>
            <Box>
                <Typography variant="subtitle1">
                    Zakres czasu:
                </Typography>
                <SelectButtonGroup
                    onSelectedChange={handleButtonChange}
                    buttons={predefinedButtons}
                    defaultButtonIndex={1}
                />

            </Box>
            <Box component="form" onSubmit={handleSubmitCustomDate}>
                <Typography variant="subtitle1">
                    Zakres niestandardowy:&nbsp;
                </Typography>
                <Stack direction="row" spacing={1}>
                    <MobileDatePicker
                        label="od"
                        inputFormat="yyyy-MM-dd"
                        value={customDates.from}
                        onChange={(value) => setCustomDates({ ...customDates, from: value })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <MobileDatePicker
                        label="do"
                        inputFormat="yyyy-MM-dd"
                        value={customDates.to}
                        onChange={(value) => setCustomDates({ ...customDates, to: value })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button type="submit" variant="outlined"> OK</Button>
                </Stack>
            </Box>
            <Box>
                <Typography variant="subtitle1">
                    Statystyki:
                </Typography>
                <Stack direction="row" spacing={1}>
                    {
                        links.map(({ name, href }) =>
                            <Chip key={name} component={Link} href={href} label={name} onClick={() => { }} />
                        )
                    }
                </Stack>
            </Box>
        </Stack>
    );
}
