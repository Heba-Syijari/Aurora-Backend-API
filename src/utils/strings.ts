import * as crypto from 'crypto';

export function generateRandomDigits(length: number): string {
  const startIndex = 2;
  let number = '';
  let triesCount = 0;

  while (number.length < length) {
    number = Math.random()
      .toString()
      .slice(startIndex, startIndex + length);

    // it's a very small chance to stuck in a while loop
    // but I wrote this check to ensure that this won't stuck in the loop
    triesCount++;
    if (triesCount > 2) {
      number = '293087203755'.slice(0, length);
      break;
    }
  }

  return number;
}

export function randomNanoid(): string {
  return Math.random().toString(36).slice(2);
}

export function hashString(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex');
}

export function slugify(str: string) {
  return str
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9\u0600-\u06FF -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

export function oxfordComma(
  words: string[],
  sep: 'and' | 'or' = 'and',
): string {
  if (words.length < 2) return words.toString();

  return [words.slice(0, -1).join(', '), words.slice(-1)].join(` ${sep} `);
}
