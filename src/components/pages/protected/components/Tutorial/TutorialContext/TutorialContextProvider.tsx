import React from "react";


interface TutorialProviderProps {
    children: React.ReactNode
}

interface TipItem {
    id: number,
    trigger: () => void,
    priority: number
}

export type registerTipType = (callback: () => void, priority?: number) => () => void

export const tutorialContext: any = React.createContext(null);


export default function TutorialContextProvider({ children }: TutorialProviderProps) {
    const [registered, setRegistered] = React.useState<TipItem[]>([]);
    const [startUp, setStartUp] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (startUp) {
            setTimeout(() => {
                if (registered.length > 0) {
                    registered.shift()?.trigger();
                    setStartUp(false);
                }
            }, 1000);
        }

    }, [registered, startUp]);


    const registerTip: registerTipType = React.useCallback((callback: () => void, priority: number = 1) => {
        const key = Date.now();

        setRegistered(old => {
            if (!old.find(({ id }) => id === key)) {

                old.push({ trigger: callback, priority: priority, id: key });
                return Object.assign([], old.sort((a, b) => b.priority - a.priority));
            }
            return old;
        });

        return () => {
            setRegistered(old => {
                if (old.length === 0) {
                    setStartUp(true);
                } else {
                    old.shift()?.trigger();
                }

                return Object.assign([], old);
            });
        };
    }, [
        setStartUp,
        setRegistered
    ]);

    return (
        <tutorialContext.Provider value={registerTip}>
            {children}
        </tutorialContext.Provider>
    );
}

