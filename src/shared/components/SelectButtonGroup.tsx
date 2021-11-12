import { ButtonGroupProps, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

export interface SelectButtonInterface {
    name: string, value: string
}

export interface SelectButtonGroupProps extends ButtonGroupProps {
    onSelectedChange: (value: string) => void,
    buttons: SelectButtonInterface[],
    defaultButtonIndex: number
}

export default function SelectButtonGroup({
    onSelectedChange, buttons, defaultButtonIndex
}: SelectButtonGroupProps) {
    const [value, setValue] = React.useState(buttons[defaultButtonIndex].value);

    React.useEffect(() => {
        onSelectedChange(value);
    }, [value, onSelectedChange]);


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    }, []);


    const renderedButtons = React.useMemo(() => {
        return buttons.map(({ value, name }) =>
            <FormControlLabel
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