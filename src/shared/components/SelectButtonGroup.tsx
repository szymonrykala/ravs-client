import { Button, ButtonGroup, ButtonGroupProps } from "@mui/material";
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
    size, onSelectedChange, buttons, defaultButtonIndex
}: SelectButtonGroupProps) {
    const [button, setButton] = React.useState<SelectButtonInterface>(buttons[defaultButtonIndex]);

    React.useEffect(() => {
        onSelectedChange(button.value);
    }, [button]);

    return (
        <ButtonGroup variant="outlined" size={size}>
            {
                buttons
                    .map((item) =>
                        <Button
                            key={item.name}
                            variant={(button.value === item.value) ? 'contained' : 'outlined'}
                            onClick={() => setButton(item)}
                        >
                            {item.name}
                        </Button>
                    )
            }
        </ButtonGroup>
    );
}