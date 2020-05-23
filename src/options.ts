/**
 * Possible options to use when converting.
 */
type Options = {
  /**
   * Determines if the program should print the sheet's name when converting.
   */
  verbose?: boolean;

  /**
   * The base directory that holds the credentials and tokens file.
   */
  dir?: string;

  /**
   * Represents the directory where the converted JSON files will be stored.
   */
  data?: string;

  /**
   * A list of sheet names to ignore and not convert.
   */
  exclude?: string[];

  /**
   *  A list of sheet names to only convert.
   */
  include?: string[];
};

export { Options };
