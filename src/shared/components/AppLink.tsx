import { Link as RouterLink } from "react-router-dom";

import { Link as LinkIcon } from "@mui/icons-material";

import { Link, LinkProps } from "@mui/material";


interface AppLinkProps extends LinkProps {
    to: string,
    withIcon?: boolean
}

export default function AppLink(props: AppLinkProps) {
    return (
        <Link
            component={RouterLink}
            underline="hover"
            display='flex'
            {...props}
        >
            {props.withIcon && <><LinkIcon fontSize="small" />&nbsp;</>}
            {props.children}
        </Link >
    );
}