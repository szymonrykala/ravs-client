import React from "react";
import { registerTipType, tutorialContext } from "./TutorialContextProvider";


export default function useTutorial() {
    return React.useContext(tutorialContext) as registerTipType
}