import { format } from 'date-fns';

export function formatAsDateTime(date: Date): string {
    return format(date, 'yyyy-MM-dd@HH:mm') + 'u';
}

export function formatAsTime(date: Date): string {
    return format(date, 'HH:mm:ss');
}

export function formatDuration(
    totalSeconds: number,
    separator: string = ' ',
): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return [
            hours,
            'h',
            separator,
            minutes,
            'm',
            separator,
            seconds,
            's',
        ].join('');
    }

    if (minutes > 0) {
        return [minutes, 'm', separator, seconds, 's'].join('');
    }

    return `${seconds}s`;
}
