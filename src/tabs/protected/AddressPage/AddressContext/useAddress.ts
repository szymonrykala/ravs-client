import React from "react";
import { addressContext } from "./AddressContextProvider";
import AddressContextValue from "./AddressContextValue";


export default function useAddress() {
    return React.useContext(addressContext) as AddressContextValue;
}