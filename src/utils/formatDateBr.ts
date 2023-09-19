import { addMinutes, format, parseISO } from 'date-fns';

function formatDateBr(date: string) {
  const parsedISODate = parseISO(date);

  return format(
    addMinutes(parsedISODate, parsedISODate.getTimezoneOffset()),
    'dd/MM/yyyy',
  );
}

export default formatDateBr;
