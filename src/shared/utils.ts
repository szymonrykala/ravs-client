


export function displayDate(dateString: string): string {
    const date = new Date(dateString);
    const format = new Intl.DateTimeFormat('pl-PL', {
        dateStyle: "medium",
        timeStyle: "medium"
    })

    return format.format(date);
}


export const timeFormat = new Intl.DateTimeFormat('pl-PL', {
    timeStyle: "medium"
});


export function isDate(str: string | undefined): boolean {
    if (!str) return false;

    let date = new Date(str);
    return Boolean(date.getDate())
}

export function urlToId(): string {
    let url = window.location.pathname.toLocaleLowerCase()
    return url.replaceAll(/\d/gi, '*')
}