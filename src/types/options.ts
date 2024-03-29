interface Options {
  /**
   * Determines if the tab name should be printed when converting.
   */
  verbose?: boolean;

  /**
   * Represents how long the program should wait between converting tabs, in milliseconds.
   */
  delay?: number;

  /**
   * The directory that holds the credentials and tokens file.
   */
  config?: string;

  /**
   * Determines where converted JSON files will be stored.
   */
  dir?: string;

  /**
   * If a tab is found to contain a path separator, all instances will be
   * replaced with this string, or `-` by default.
   */
  separator?: string;
}

export { Options };
