import { path } from 'app-root-path';
import { join } from 'path';

/**
 * The absolute path for this project's root directory.
 */
const root: string = path;

/**
 * Represents the default directory that contains the config files.
 */
const config: string = join(path, 'config');

/**
 * The absolute path for the default location of the credentials file.
 */
const credentials: string = join(config, 'credentials.json');

/**
 * The absolute path for the default location of the tokens file.
 */
const tokens: string = join(config, 'tokens.json');

/**
 * Represents the directory where converted JSON files will be stored.
 */
const data: string = join(root, 'data');

export const directories = { root, config, credentials, tokens, data };
