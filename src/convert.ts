import { backOff } from 'exponential-backoff';
import { writeFileSync } from 'fs';
import { sheets_v4 } from 'googleapis';
import { zipObject } from 'lodash';
import ora from 'ora';
import { join } from 'path';

import { maxAttempts } from './util/config';
import { ensure } from './util/ensure';

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

  // Before pushing the initialized object, we ensure that no values are
  // undefined, as if a key is undefined and then saved as a JSON file, that
  // key simply won't exist on the object.
  for (const row of rows) {
    data.push(ensure({ SourceSheet: name, ...zipObject(header, row) }));
  }

  // Once we have converted this spreadsheet, we'll save it to the directory.
  writeFileSync(join(dir, `${name}.json`), JSON.stringify(data, null, 2));
}

/**
 * This function is executed if an error occurs while converting, if the given
 * attempt number is the maximum allowed attempt, an error is thrown.
 * @param  error   The error that was thrown.
 * @param  attempt The number of the attempt of when the error occurred.
 * @param  spinner The ora instance, if one exists.
 * @return         Determines if the program should continue to attempt.
 */
function handler(error: any, attempt: number, spinner: ora.Ora | null): boolean {
  spinner?.fail('error\n');

  // Quit the program if the current attempt is the maximum allowed attempt as
  // we don't want this program to bombarde Google's API.
  if (attempt === maxAttempts) {
    throw new Error(`An error occurred ${maxAttempts} time(s)\n${error}`);
  }

  // Inform the user of the aerror and the amount of attempts.
  console.warn(`An error occurred while converting\n${error}\n\nRetrying attempt #${attempt + 1} in 30 seconds...\n`);

  return true;
}

/**
 * Implements a backoff system while trying to convert spreadsheets to JSON.
 * When trying to convert and an error occurs, we'll try to convert that convert
 * that tab again, up to maxAttempts, when this amount is met, the program ends.
 * @param  client  The authorized Google Spreadheets client.
 * @param  id      The ID of the spreadsheet.
 * @param  name    The name of the sheet to convert.
 * @param  dir     The directory that we'll save the JSON file to.
 * @param  spinner The ora instance, if one exists.
 */
async function retry(client: sheets_v4.Sheets, id: string, name: string, dir: string, spinner: ora.Ora | null): Promise<void> {
  await backOff<void>(() => convert(client, id, name, dir), {
    retry: (e: any, attempt: number): boolean => handler(e, attempt, spinner),
    startingDelay: 30000,
    timeMultiple: 1,
    numOfAttempts: maxAttempts,
  });
}

export { retry };
