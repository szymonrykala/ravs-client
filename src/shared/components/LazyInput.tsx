import InputBase from "@mui/material/InputBase";
import { SxProps } from "@mui/system";
import React from "react";


interface SimpleInputProps {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    name: string,
    sx?: SxProps
}

export default function LazyInput({
    value,
    onChange,
    label,
    name,
    sx,
}: SimpleInputProps) {
    const [trigger, setTrigger] = React.useState<any>();
    const [str, setStr] = React.useState<string>(value);


    const handleSearchFieldChange = React.useCallback((evt) => {
        setStr(evt.target.value);
        clearTimeout(trigger);

        let timer = setTimeout(() => {
            onChange(evt);
        }, 1000);
        setTrigger(timer);
    }, [
        trigger,
        onChange,
    ]);


    return <InputBase
        name={name}
        value={str}
        onChange={handleSearchFieldChange}
        placeholder={label}
        sx={{
            width: '100%',
            maxWidth: '600px',
            p: 1,
            bgcolor: 'background.default',
            ...sx
        }}
        inputProps={{ 'aria-label': label }}
    />;
}