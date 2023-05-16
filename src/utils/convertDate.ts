export function convertToCustomTimezone(offset: number) {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const customTime = new Date(utc + offset * 3600000);

  return customTime;
}
