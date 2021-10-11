import { useContext } from "react";
import { sessionContext, SessionContextInterface } from "./sessionProvider";



export default function useSession() {
  return useContext(sessionContext) as SessionContextInterface;
}