import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";



interface Props {
    title: string | React.ReactNode
    children: {
        label: string,
        value: string | React.ReactNode
    }[]
}


export default function DatesView(props: Props) {
    return (
        <div>
            <Typography component="h3" variant="subtitle1">
                {props.title}
            </Typography>
            <Typography
                variant="body1"
                color='text.secondary'
                textAlign='left'
                component='div'
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    flexWrap='wrap'
                    rowGap={1}
                    columnGap={1}
                >
                    {
                        props.children.map(({ label, value }) =>
                            <div>
                                {label}:&nbsp;<Chip label={value} />
                            </div>
                        )
                    }
                </Stack>
            </Typography>
        </div>
    );
}