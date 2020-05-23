import { existsSync } from 'fs';

/**
 * Returns the path as a JSON object.
 * @param  The absolute path for the JSON file.
 * @return The path as a JSON object, if the path doesn't exist, null is returned.
 */
function importJSON<T>(path: string): T | null {
  // Make sure that the path exists.
  if (!existsSync(path)) {
    return null;
  }

  return require(path) as T;
}

/**
 * A helper function used to sanitize an array and remove
 * any values that are either null or undefined.
 * @return  Determines if the given value isn't null or undefined.
 */
function sanitize<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export { importJSON, sanitize };
