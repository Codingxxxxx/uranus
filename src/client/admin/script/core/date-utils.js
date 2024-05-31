import { format } from 'date-fns';

export function formaTableDate(isoDateString) {
  return format(isoDateString, 'mm/dd/yyyy hh:mm a');
}