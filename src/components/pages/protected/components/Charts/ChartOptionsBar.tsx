import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import React from "react";
import SelectButtonGroup, { SelectButtonInterface } from "../../../../../shared/components/SelectButtonGroup";
import { useQueryParams } from "../../../../../contexts/QueryParamsContext";
import { ChartsQueryData } from "../../../../../services/ChartService";


const predefinedButtons: SelectButtonInterface[] = [
    { name: "tydzień", value: "1 week ago" },
    { name: "miesiąc", value: "1 month ago" },
    { name: "6 miesięcy", value: "6 month ago" },
    { name: "rok", value: "1 year ago" },
];



export default function ChartOptionsBar() {
    const { queryParams, setQueryParams } = useQueryParams<ChartsQueryData>();

    const [customDates, setCustomDates] = React.useState<{ from: Date, to: Date }>({
        from: new Date(),
        to: new Date()
    });

    const handleButtonChange = React.useCallback(async (buttonValue: string) => {
        setQueryParams({
            from: buttonValue,
            to: "now"
        });
    }, [
        setQueryParams
    ]);


    const handleSubmitCustomDate = React.useCallback(async (evt: any) => {
        evt.preventDefault();
        setQueryParams({
            from: customDates.from?.toISOString(),
            to: customDates.to?.toISOString()
        });
    }, [
        customDates.from,
        customDates.to,
        setQueryParams
    ]);


    return (
        <Stack direction="column" spacing={2}>
            <Box>
                <Typography variant="subtitle2">
                    Zakres czasu:
                </Typography>
                <SelectButtonGroup
                    onChange={handleButtonChange}
                    buttons={predefinedButtons}
                    value={queryParams.from}
                />

            </Box>
            <Box component="form" onSubmit={handleSubmitCustomDate}>
                <Typography variant="subtitle2">
                    Zakres niestandardowy:&nbsp;
                </Typography>
                <Stack direction="row" spacing={1}>
                    <MobileDatePicker
                        label="od"
                        inputFormat="yyyy-MM-dd"
                        value={customDates.from}
                        onChange={(value) => setCustomDates({ ...customDates, from: value ?? new Date() })}
                        renderInput={(params) => <TextField {...params} size='small' />}
                    />
                    <MobileDatePicker
                        label="do"
                        inputFormat="yyyy-MM-dd"
                        value={customDates.to}
                        onChange={(value) => setCustomDates({ ...customDates, to: value ?? new Date() })}
                        renderInput={(params) => <TextField {...params} size='small' />}
                    />
                    <Button type="submit" variant="outlined"> OK</Button>
                </Stack>
            </Box>
        </Stack>
    );
}
