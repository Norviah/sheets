import { writeFileSync } from 'fs';
import { sheets_v4 } from 'googleapis';
import { zipObject } from 'lodash';
import ora from 'ora';
import { join } from 'path';

import { wait } from './util/wait';

/**
 * Converts the given tab name from the spreadsheet into a JSON file.
 * @param  client The authorized Google Spreadheets client.
 * @param  id     The ID of the spreadsheet.
 * @param  name   The name of the sheet to convert.
 * @param  dir    The directory that we'll save the JSON file to.
 */
async function convert(client: sheets_v4.Sheets, id: string, name: string, dir: string): Promise<void> {
  // Initialize an array to hold references to all converted data.
  const data: any[] = [];

  // Call the client for information about the given sheet name.
  const response = await client.spreadsheets.values.get({ spreadsheetId: id, range: name, valueRenderOption: 'FORMULA', dateTimeRenderOption: 'FORMATTED_STRING' });

  if (!response.data.values) {
    return console.error(`Couldn't get information for the tab: ${name}`);
  }

  // For every Google Spreadsheet, the first table represents the name of each
  // column, with the rest of the tables representing the actual values. Here,
  // we separate those tables into their own variables.
  const [header, ...rows] = response.data.values;

  // As we know that 'header' represents the names of each column, we use lodash
  // to initialize a new object consisting of these values. zipObject takes two
  // arrays and initializes a new object with the first array representing the
  // keys and the second array representing the values.
  for (const row of rows) {
    data.push({ SourceSheet: name, ...zipObject(header, row) });
  }

  // Once we have converted this spreadsheet, we'll save it to the directory.
  writeFileSync(join(dir, `${name}.json`), JSON.stringify(data, null, 2));
}

/**
 * Essentially a helper function for the 'convert' function, this function calls
 * 'convert' method and, if an error occurs, it most likely means that the
 * project has been rate limited by Google. To combat this, we wait 30 seconds
 * and try to convert the given sheet again.
 * @param  client The authorized Google Spreadheets client.
 * @param  id      The ID of the spreadsheet.
 * @param  name    The name of the sheet to convert.
 * @param  dir     The directory that we'll save the JSON file to.
 * @param  spinner The ora instance, if one exists.
 */
async function retry(client: sheets_v4.Sheets, id: string, name: string, dir: string, spinner: ora.Ora | null): Promise<void> {
  await convert(client, id, name, dir).catch(async (error) => {
    spinner?.fail('error\n');
    console.warn(`An error occurred while converting the tab: ${name}\n${error}\n\nRetrying in 30 seconds...\n`);
    await wait(30000).then(async () => await retry(client, id, name, dir, spinner));
  });
}

export { retry };
