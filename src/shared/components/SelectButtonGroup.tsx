import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

export interface SelectButtonInterface {
    name: string, value: string
}

export interface SelectButtonGroupProps {
    onChange: (value: string) => void,
    buttons: SelectButtonInterface[],
    value: string
}

export default function SelectButtonGroup({
    onChange, buttons, value
}: SelectButtonGroupProps) {

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((event.target as HTMLInputElement).value);
    }, [onChange]);


    const renderedButtons = React.useMemo(() => {
        return buttons.map(({ value, name }) =>
            <FormControlLabel
                key={name}
                value={value}
                control={<Radio />}
                label={name}
                aria-label={name}
                title={name}
            />
        )
    }, [buttons]);


    return (
        <FormControl component="fieldset">
            <RadioGroup
                row
                aria-label="wybór opcji"
                name="wybór zdefiniowanej opcji"
                value={value}
                onChange={handleChange}
            >
                {renderedButtons}
            </RadioGroup>
        </FormControl>
    );
}