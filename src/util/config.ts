/**
 * Represents the max amount of attempts the program will try when trying to
 * convert Google Spreadsheets to JSON. An attempt isn't consistent with each
 * tab, and when this amount is met, the program exits.
 */
const maxAttempts: number = 3;

export { maxAttempts };
