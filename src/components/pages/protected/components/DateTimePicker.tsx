import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import React from "react";


interface Props {
    value: string,
    label: string,
    onChange: (value: string) => void,
}

export default function DateTimePicker({
    value,
    onChange,
    label,
}: Props) {

    const [dateVal, setDateVal] = React.useState<Date>(new Date(value));

    const handleChange = React.useCallback((newValue: Date | null) => {
        if (newValue) {
            onChange(newValue.toLocaleString('pl'));
            setDateVal(newValue);
        }
    }, [
        onChange
    ]);

    return (
        <MobileDateTimePicker
            minDate={new Date()}
            label={label}
            inputFormat="dd.MM.yyyy HH:mm"
            value={dateVal}
            onChange={handleChange}
            renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
        />
    )
}