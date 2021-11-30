import Stack from "@mui/material/Stack";
import React from "react";
import { QueryParamsContext } from "../../../contexts/QueryParamsContext";
import { ChartsQueryData } from "../../../services/ChartService";
import ChartOptionsBar from "./ChartOptionsBar";
import { ChartsContext } from "./ChartsContext";


interface GenericChartsTabProps {
    children: React.ReactNode[] | React.ReactNode
}

export default function ChartsTab(props: GenericChartsTabProps) {
    return (
        <QueryParamsContext
            name="charts-query-params"
            default={{ from: '1 month ago', to: 'now' } as ChartsQueryData}
        >
            <ChartsContext>
                <Stack spacing={4}>
                    <ChartOptionsBar />
                    {props.children}
                </Stack>
            </ChartsContext>
        </QueryParamsContext>
    )
}