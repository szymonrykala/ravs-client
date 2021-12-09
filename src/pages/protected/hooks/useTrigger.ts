import React from "react";


export default function useTrigger(timeInterval: number) {
    const [trigger, setTrigger] = React.useState<boolean>();


    React.useEffect(() => {
        const int = setInterval(() => setTrigger(old => !old), timeInterval);

        return () => clearInterval(int);
    }, [
        timeInterval
    ]);

    return trigger;
}