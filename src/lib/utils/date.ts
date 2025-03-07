const formatter = new Intl.DateTimeFormat("it-IT", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Rome",
});

export function asFormattedTime(time: string) {
  return formatter.format(new Date(time));
}
