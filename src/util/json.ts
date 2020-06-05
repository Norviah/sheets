import { existsSync } from 'fs';

/**
 * Returns the JSON path as the given type if the path exists, otherwise, null.
 * @param  path The path to import and return.
 * @return      The path as the given type or null if the path doesn't exist.
 */
function json<T>(path: string): T | null {
  if (!existsSync(path)) {
    return null;
  }

  return require(path) as T;
}

export { json };
