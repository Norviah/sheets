type Options = {
  /**
   * Represents the directory to store generated JSON
   * files to. If a file isn't given, '$root/data' is used.
   */
  path?: string;

  /**
   * Determines if the program should output the tabs that it's currently converting.
   */
  verbose?: boolean;
};

/**
 * Converts the tabs for the given sheet into JSON files.
 * @param  id      The ID of the sheet to convert.
 * @param  options Optional options.
 * @return         Nothing.
 */
export default function sheets(id: string, options?: Options): Promise<void>;

declare module '@norviah/sheets';
