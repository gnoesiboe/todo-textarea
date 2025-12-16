import { format } from 'date-fns';

export function formatAsDateTime(date: Date): string {
    return format(date, 'yyyy-MM-dd @ HH:mm') + 'u';
}
