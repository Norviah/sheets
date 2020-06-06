interface Spreadsheet {
  /**
   * The ID of the spreadsheet.
   */
  id: string;

  /**
   * A list of sheet names to ignore and not convert.
   */
  exclude?: string[];

  /**
   * A list of sheet names to only convert.
   */
  include?: string[];
}

export { Spreadsheet };
