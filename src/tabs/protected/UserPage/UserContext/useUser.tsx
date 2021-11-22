import React from "react";
import { userContext } from "./UserContextProvider";
import UserContextValue from "./UserContextValue";



export default function useUser() {
    return React.useContext(userContext) as UserContextValue;
}
