const { writeFileSync, existsSync } = require('fs');
const readline = require('readline-sync');
const { google } = require('googleapis');

const config = require('./config.js');

/**
 * Imports the given JSON path and returns it as
 * an object if the path exists, otherwise, null is returned.
 * @param  {String} path The JSON path to import.
 * @return {Object || null}      The given JSON path imported as a JSON path if it exists, otherwise null
 */
function json(path) {
  // Make sure that the path exists.
  if (!existsSync(path)) {
    return null;
  }

  return require(path);
}

/**
 * Generates new tokens for the given client, saves it to
 * a local file, and authorizes the given client.
 * @param  {OAuth2Client} client The client to generate tokens for.
 * @return {OAuth2Client}        The authorized client.
 */
async function generateTokens(client) {
  // After a user has executed this project for the first time,
  // they don't have a tokens file stored, so we must
  // generate one for them. This line generates a new URL for the user for authorization purposes.
  const URL = client.generateAuthUrl({ access_type: 'offline', scope: config.scopes });

  console.log(`Authorize this app by visiting this url: ${URL}`);

  // Once they visit that URL, they grant access for this app and
  // then generates a new token, and so we grab that token here.
  const code = readline.question('\nEnter the code from that page here: ');

  // This will provide an object with the access_token and refresh_token.
  const { tokens } = await client.getToken(code);

  // Store the token to disk to use for later program executions.
  writeFileSync(config.tokens, JSON.stringify(tokens));

  console.log(`Tokens stored to: ${config.tokens}`);

  return client;
}

/**
 * Initializes a new client with Google's API.
 * @return {OAuth2Client} An authorized client with Google's API.
 */
async function authorize() {
  // Try to get the credentials on disk.
  const credentials = json(config.credentials);

  if (!credentials) {
    throw new Error(`Missing credentials at: ${config.credentials}.`);
  }

  // Initialize a new client with Google's API with the given credentials.
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Try to import the tokens from the token path.
  const tokens = json(config.tokens);

  // If no token file exists, we create a new token file.
  if (!tokens) {
    return await generateTokens(client);
  }

  // Set the credentials for the client.
  client.setCredentials(tokens);

  return client;
}

module.exports = { authorize };
