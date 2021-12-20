import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import React from "react";


interface Props {
    value: Date,
    label: string,
    onChange: (value: Date) => void,
}

export default function DateTimePicker({
    value,
    onChange,
    label,
}: Props) {

    const handleChange = React.useCallback((newValue: Date | null) => {
        if (newValue) {
            onChange(newValue);
        }
    }, [
        onChange
    ]);

    return (
        <MobileDateTimePicker
            minDate={new Date()}
            label={label}
            value={value}
            onChange={handleChange}
            renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
        />
    )
}

