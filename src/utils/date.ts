export function addYears(d: Date, n: number): Date {
  const date = new Date(d);
  date.setFullYear(date.getFullYear() + n);
  return date;
}

export function subtractYears(d: Date, n: number): Date {
  return addYears(d, n * -1);
}

export function addMonths(d: Date, n: number): Date {
  const date = new Date(d);
  date.setMonth(date.getMonth() + n);
  return date;
}

export function subtractMonths(d: Date, n: number): Date {
  return addMonths(d, n * -1);
}

export function addDays(d: Date, n: number): Date {
  const date = new Date(d);
  date.setDate(date.getDate() + n);
  return date;
}

export function subtractDays(d: Date, n: number): Date {
  return addDays(d, n * -1);
}

export function truncateDate(d: Date, type: 'day' | 'month' | 'year'): Date {
  switch (type) {
    case 'day':
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    case 'month':
      return new Date(d.getFullYear(), d.getMonth());
    case 'year':
      return new Date(d.getFullYear(), 0);
  }
}

export function isDateGreaterThan(d1: Date, d2: Date): boolean {
  return d1.getTime() > d2.getTime();
}

export function getExpirationDays(d: Date): number {
  const differenceInTime = new Date().getTime() - d.getTime();

  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

  return -differenceInDays;
}
