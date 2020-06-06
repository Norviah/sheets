interface Response {
  [key: string]: {
    /**
     * Represents a list of tabs that were converted.
     */
    converted: string[];

    /**
     * Represents the names of all available tabs.
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
}

export { Response };
