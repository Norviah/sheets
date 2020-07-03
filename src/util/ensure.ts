/**
 * Ensures that every key within the object is not undefined.
 * @param  object The object to ensure.
 * @return        The object without any undefined values.
 */
function ensure(object: { [key: string]: any }): { [key: string]: any } {
  for (const key in object) {
    if (object[key] === undefined) object[key] = null;
  }

  return object;
}

export { ensure };
