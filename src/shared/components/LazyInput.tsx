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

export default function LazyInput(props: SimpleInputProps) {
    const [trigger, setTrigger] = React.useState<any>();
    const [str, setStr] = React.useState<string>(props.value);


    const handleSearchFieldChange = React.useCallback((evt) => {
        setStr(evt.target.value);
        clearTimeout(trigger);

        let timer = setTimeout(() => {
            props.onChange(evt);
        }, 2000);
        setTrigger(timer);
    }, [trigger]);


    return <InputBase
        name={props.name}
        value={str}
        onChange={handleSearchFieldChange}
        placeholder={props.label}
        sx={{
            width: '100%',
            maxWidth: '600px',
            p: 1,
            bgcolor: 'background.default',
            ...props.sx
        }}
        inputProps={{ 'aria-label': props.label }}
    />;
}