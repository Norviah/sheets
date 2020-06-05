type Options = {
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
  dir?: string;

  /**
   * Determines where converted JSON files will be stored.
   */
  data?: string;

  /**
   * A list of sheet names to ignore and not convert.
   */
  exclude?: string[];

  /**
   * A list of sheet names to only convert.
   */
  include?: string[];
};

export { Options };