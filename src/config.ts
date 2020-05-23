import { path } from 'app-root-path';
import { join } from 'path';

/**
 * Represents the scopes that this project will use,
 * since we just need to read data from sheets, we use the 'readonly' scope.
 */
const scopes: string[] = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/**
 * The absolute path for this project's root.
 */
const root: string = path;

/**
 * Represents the default directory that will hold config files.
 */
const config: string = join(path, 'config');

/**
 * The default directory that holds the credentials file.
 */
const credentials: string = join(config, 'credentials.json');

/**
 * The default directory that holds the tokens file.
 */
const tokens: string = join(config, 'tokens.json');

/**
 * Represents the directory where the JSON files will be stored.
 */
const data: string = join(root, 'data');

export default { scopes, root, config, credentials, tokens, data };
