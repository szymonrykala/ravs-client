import { Link as RouterLink } from "react-router-dom";
import { Link as LinkIcon } from "@mui/icons-material";
import { Link, LinkProps } from "@mui/material";


interface AppLinkProps extends LinkProps {
    to: string,
    withIcon?: boolean,
}

export default function AppLink(props: AppLinkProps) {
    const { withIcon, ...restProps } = props;
    return (
        <Link
            component={RouterLink}
            underline="hover"
            display='inline-flex'
            {...restProps}
        >
            {withIcon && <><LinkIcon fontSize="small" />&nbsp;</>}
            {restProps.children}
        </Link >
    );
}