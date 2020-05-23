/**
 * Represents the response when all sheets have been converted.
 */
type Response = {
  /**
   * Represents the names of the sheets that were converted.
   */
  converted: string[];

  /**
   * Represents the names of all sheets that were available.
   */
  names: string[];

  /**
   * Represents the directory that contains the credentials and tokens file.
   */
  dir: string;

  /**
   * Represents the directory where the JSON files were stored.
   */
  data: string;
};

export { Response };
