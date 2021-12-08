import React from "react";


export default function useTrigger(timeInterval: number) {
    const [intervalHandle, setIntervalHandle] = React.useState<any>();
    const [trigger, setTrigger] = React.useState<boolean>();


    React.useEffect(() => {
        const int = setInterval(() => setTrigger(old => !old), timeInterval);
        setIntervalHandle(int);

        return () => clearInterval(intervalHandle);
    }, [
        timeInterval
    ]);

    return trigger;
}