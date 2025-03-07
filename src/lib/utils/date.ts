const formatter = new Intl.DateTimeFormat("it-IT", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Rome",
});
const hourFormatter = new Intl.DateTimeFormat("it-IT", {
  hour: "2-digit",
  timeZone: "Europe/Rome",
});

export function asFormattedTime(time: string, withoutMinutes = false) {
  return withoutMinutes
    ? hourFormatter.format(new Date(time))
    : formatter.format(new Date(time));
}
