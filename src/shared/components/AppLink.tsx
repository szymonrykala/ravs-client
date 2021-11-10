import { Link as RouterLink } from "react-router-dom";

import { Link as LinkIcon } from "@mui/icons-material";

import { Link, LinkProps } from "@mui/material";
import { SxProps } from "@mui/system";


interface AppLinkProps extends LinkProps {
    to: string,
    withIcon?: boolean,
}

export default function AppLink({ withIcon, ...restProps }: AppLinkProps) {
    return (
        <Link
            component={RouterLink}
            underline="hover"
            display='flex'
            {...restProps}
        >
            {withIcon && <><LinkIcon fontSize="small" />&nbsp;</>}
            {restProps.children}
        </Link >
    );
}