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

/**
 * Returns a placeholder string from the given array by the given index.
 * If the array is exhausted, it will wrap around to the beginning.
 * If the array is empty, it will return the given default placeholder.
 * @param {ReadonlyArray<string>} placeholders - Required. The array of placeholder strings.
 * @param {number} index - Required. The index of the placeholder to retrieve.
 * @param {string | undefined} [defaultPlaceholder] - Optional. The default placeholder to return if the array is empty.
 * @returns {string} The placeholder string at the given index.
 */
export const getPlaceholderByIndex = (
  placeholders: ReadonlyArray<string>,
  index: number,
  defaultPlaceholder?: string,
): string => {
  return placeholders[index % placeholders.length] ?? defaultPlaceholder ?? '';
};

/**
 * Retrieves an error message from an unknown error object.
 *
 * @param {unknown} error - The error object to process.
 * @param {string} [defaultMessage='Something went wrong'] - The default message to return if the error doesn't have a message.
 * @returns {string} The extracted error message or the default message.
 */
export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = 'Something went wrong',
): string => {
  console.error(error);
  let errorMessage: string = defaultMessage;
  if (error instanceof Error && error.message.length < 100) {
    errorMessage = error.message;
  }
  return errorMessage;
};

/**
 * Returns the first character of the first word in the given name.
 * If the name is empty, returns an empty string.
 * @param {string} name - The name to get the initial from.
 * @returns {string} The first character of the first word in the given name.
 */
export const initialAvatar = (name: string): string => {
  if (!name) return '';
  const nameParts = name.trim().split(' ');
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
  return initials.slice(0, 1);
};
