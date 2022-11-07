import { format } from 'date-fns';

export function formatDate(date: Date) {
  const formatedDate = format(new Date(date), 'dd/MM/yyyy');
  return formatedDate;
};

export function getHours(hours: number) {
  const formatedHours = Math.round(hours).toFixed(2);
  return `${formatedHours}h`;
};