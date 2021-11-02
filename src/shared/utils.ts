


export function displayDate(dateString: string): string {
    const date = new Date(dateString);
    const format = new Intl.DateTimeFormat('pl-PL', {
        dateStyle: "medium",
        timeStyle: "medium"
    })

    return format.format(date);
}