const { path } = require('app-root-path');
const { join } = require('path');

/**
 * Represents the scopes that this application needs
 * in order to execute, since we just need to view sheets we
 * use the 'readonly' scope.
 * @type {Array}
 */
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/**
 * The absolute path towards the root of this project.
 * @type {String}
 */
const root = path;

/**
 * Represents the directory that holds the credentials and tokens file.
 * @type {String}
 */
const config = join(root, 'config');

/**
 * The absolute path for the credentials file.
 * @type {String}
 */
const credentials = join(config, 'credentials.json');

/**
 * The absolute path for the tokens file.
 * @type {String}
 */
const tokens = join(config, 'tokens.json');

/**
 * Represents where the JSON files will be stored.
 * @type {String}
 */
const data = join(root, 'data');

module.exports = { root, scopes, credentials, tokens, data };
