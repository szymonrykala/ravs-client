import { useContext } from "react";
import { sessionContext } from "./sessionProvider";
import SessionValue from "./SessionValue";



export default function useSession() {
  return useContext(sessionContext) as SessionValue;
}