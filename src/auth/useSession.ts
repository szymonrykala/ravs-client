import { useContext } from "react";
import { sessionContext, SessionContextInterface } from "./sessionProvider";



export default function useSession() {
  return <SessionContextInterface>useContext(sessionContext);
}