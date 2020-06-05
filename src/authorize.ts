import { writeFileSync } from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { join } from 'path';
import { question } from 'readline-sync';

import { Credentials } from './types/credentials';
import { directories } from './util/directories';
import { Tokens } from './types/tokens';
import { json } from './util/json';

/**
 * Represents the scopes that this project will use, we just need to read
 * information from spreadsheets, so we'll use the 'readonly' scope.
 */
const scopes: string[] = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/**
 * Generates tokens for the client and saves the tokens to the given directory,
 * the client is authorized with the generated tokens and is returned.
 * @param  client The unauthorized client with Google's API.
 * @param  dir    Represents where the generated tokens will be saved to.
 * @return        The client authorized with Google's API.
 */
async function generateTokens(client: OAuth2Client, dir: string): Promise<OAuth2Client> {
  // After this project is executed for the first time, the user will probably
  // not have tokens saved on disk. If so, we'll generate one for them, this URL
  // represents the link that the user can use to authorize this project.
  const URL: string = client.generateAuthUrl({ access_type: 'offline', scope: scopes });

  console.log(`Authorize this app by visiting this URL:\n${URL}`);

  // Once the user has visited that URL and granted access, Google will generate
  // a code for this project to use. We'll prompt the user to enter that here.
  const code: string = question('\nEnter the code from that page here: ');

  // We'll get the access and refresh tokens from that code.
  const { tokens } = await client.getToken(code);

  // Save the tokens to the directory for later program executions.
  writeFileSync(join(dir, 'tokens.json'), JSON.stringify(tokens, null, 2));

  console.log(`\nTokens stored at: ${join(dir, 'tokens.json')}`);

  // Authorize the client with the generated tokens.
  client.setCredentials(tokens);

  return client;
}

/**
 * Initializes a new client with Google's API and returns that reference.
 * @param  dir The root directory that holds the credentials and tokens file.
 * @return     An authorized client with Google's API.
 */
async function authorize(dir: string = directories.config): Promise<OAuth2Client> {
  // Try to import the credentials from the directory..
  const credentials: Credentials | null = json(join(dir, 'credentials.json'));

  if (!credentials) {
    throw new Error(`Missing credentials at: ${join(dir, 'credentials.json')}`);
  }

  // Initialize a new Google API client with the credentials.
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Import tokens from the directory.
  const tokens: Tokens | null = json(join(dir, 'tokens.json'));

  // If the user doesn't have any tokens, we generate one for them.
  if (!tokens) {
    return await generateTokens(client, dir);
  }

  // Authorize the client with the tokens.
  client.setCredentials(tokens);

  return client;
}

export { authorize };
