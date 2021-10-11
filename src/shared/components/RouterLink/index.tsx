import { Link } from "react-router-dom";

import './style.css';


export default function RouterLink(props: any) {
    return (
        <Link
        className="coustom-router-link"
            {...props}
        />
    )
}