export function convertDate(dateStr: string) {
  const date = new Date(dateStr);
  const formatted = new Intl.DateTimeFormat('en-US').format(date);
  return formatted;
}
