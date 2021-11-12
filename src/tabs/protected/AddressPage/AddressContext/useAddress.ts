import React from "react";
import { addressContext } from "./AddressContextProvider";
import AddressContextValue from "./AddressContextValue";


export default function useBuilding() {
    return React.useContext(addressContext) as AddressContextValue;
}