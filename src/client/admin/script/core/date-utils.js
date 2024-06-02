import { format } from 'date-fns';

export function formatTableDate(isoDateString) {
  return format(isoDateString, 'mm/dd/yyyy hh:mm a');
}