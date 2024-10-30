import { twMerge } from 'tailwind-merge';

export const isClient = () => typeof window !== 'undefined';

export const body = (isClient() && document.body) as HTMLElement;

/**
 * Concatenates truthy classes into a space-separated string.
 *
 * @param classes - The classes to concatenate.
 * @returns The concatenated classes.
 */
export const clx = (...classes: (string | boolean | undefined)[]): string => {
  return twMerge(classes.filter(Boolean).join(' '));
};

/**
 * Returns a memoized function that will only call the passed function when it hasn't been
 * called for the wait period.
 *
 * @param {Function} func - The function to be debounced.
 * @param {number} wait - The amount of time in milliseconds to wait before invoking the
 * debounced function.
 * @return A memoized function that is debounced
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
) => {
  let timeout: NodeJS.Timeout | undefined;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Converts a string containing Persian numbers to a string containing English numbers.
 * @param {string} input - The string containing Persian numbers.
 * @returns {string} The string with Persian numbers replaced with English numbers.
 */
export const convertPersianToEnglishNumbers = (input: string): string => {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let output = input;
  for (let i = 0; i < persianNumbers.length; i++) {
    output = output.replace(persianNumbers[i], englishNumbers[i]);
  }
  return output;
};

/**
 * Formats a given number string with commas and appends a currency unit.
 * @param {string} value - Required. The number string to format.
 * @param {string} currencyUnit - Optional. The currency unit to append to the formatted string.
 * @returns {string} The formatted string with commas and the currency unit.
 */
export const formatNumberWithCommas = (value: string): string => {
  // Remove non-digit characters (except dot for decimals)
  const numberValue = value.replace(/[^0-9.]/g, '');

  // Split integer and decimal parts (if any)
  const [integer, decimal] = numberValue.split('.') as [
    string,
    string | undefined,
  ];

  // Format the integer part with commas
  const formattedInteger = new Intl.NumberFormat('en-US').format(
    Number(integer || 0),
  );

  // Return the formatted value with the currency unit
  return decimal !== undefined
    ? `${formattedInteger}.${decimal}`
    : formattedInteger;
};
