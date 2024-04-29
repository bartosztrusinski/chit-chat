/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
export function getRelativeTimeString(date: Date, lang = 'en'): string {
  // Get the user's language if available
  if (typeof navigator !== 'undefined') {
    lang = navigator.language;
  }

  const timeMs = date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [
    60, // a minute
    3600, // an hour
    86400, // a day
    86400 * 7, // a week
    86400 * 30, // a month
    86400 * 365, // a year
    Infinity,
  ];

  const units: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}
