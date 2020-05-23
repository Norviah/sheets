import { writeFileSync } from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { join } from 'path';
import readline from 'readline-sync';

import config from './config';
import { Credentials, Tokens } from './types';
import { importJSON } from './util';

/**
 * Generates new tokens for the client and saves
 * the generated token to the given directory.
 * @param  client The Google Sheets client.
 * @param  dir    Where the generated tokens will be stored.
 * @return        The given client authorized.
 */
async function generateTokens(client: OAuth2Client, dir: string): Promise<OAuth2Client> {
  // After a user has executed this project for the first time,
  // they don't have a tokens file stored, so we must
  // generate one for them. This line generates a new URL for the user for authorization purposes.
  const URL: string = client.generateAuthUrl({ access_type: 'offline', scope: config.scopes });

  console.log(`Authorize this app by visiting this url: ${URL}`);

  // Once they visit that URL, they grant access for this app and
  // then generates a new token, and so we grab that token here.
  const code: string = readline.question('\nEnter the code from that page here: ');

  // This will provide an object with the access_token and refresh_token.
  const { tokens } = await client.getToken(code);

  // Store the token to disk to use for later program executions.
  writeFileSync(join(dir, 'tokens.json'), JSON.stringify(tokens));

  console.log(`\nTokens stored to: ${join(dir, 'tokens.json')}`);

  // Set the client's credentials to the generated tokens.
  client.setCredentials(tokens);

  return client;
}

/**
 * Initializes a new client with Google's API and returns that reference.
 * @param  dir The base directory that holds the credentials and tokens file.
 * @return An authorized client with Google's API.
 */
async function authorize(dir: string): Promise<OAuth2Client> {
  // Try to import the credentials on disk.
  const credentials: Credentials | null = importJSON(join(dir, 'credentials.json'));

  if (!credentials) {
    throw new Error(`Missing credentials at: ${join(dir, 'credentials.json')}`);
  }

  // Initialize a new client with Google's API with the given credentials.
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Try to import tokens.
  const tokens: Tokens | null = importJSON(join(dir, 'tokens.json'));

  // If no token file exists, we create a new token file.
  if (!tokens) {
    return await generateTokens(client, dir);
  }

  // Set the credentials for the client.
  client.setCredentials(tokens);

  return client;
}

export { authorize };
