import { format, isSameDay, isSameYear } from 'date-fns';
import { hu } from 'date-fns/locale';

export function getFormattedDate(start: string | number | Date): string {
  const startDate = new Date(start);
  const now = new Date();

  let dateString = formatHu(startDate, 'yyyy. MMM dd. HH:mm');
  if (isSameYear(startDate, now)) {
    dateString = formatHu(startDate, 'MM. dd. HH:mm');
  }
  if (isSameDay(startDate, now)) {
    dateString = formatHu(startDate, 'HH:mm');
  }
  return dateString;
}

export function formatHu(date: string | number | Date, formatString: string): string {
  return format(date, formatString, { locale: hu });
}

export function isEventActive(event: { timestampStart: number; timestampEnd: number }) {
  const now = Date.now();
  return event.timestampStart < now && event.timestampEnd > now;
}

export function isEventSoon(event: { timestampStart: number }) {
  const now = Date.now();
  return event.timestampStart < now + 60 * 60 * 1000;
}
