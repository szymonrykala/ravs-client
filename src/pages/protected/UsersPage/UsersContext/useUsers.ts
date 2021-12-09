import React from "react";
import { UsersContextValue } from ".";
import { usersContext } from "./UsersContextProvider";



export default function useUsers(){
    return React.useContext(usersContext) as UsersContextValue
}