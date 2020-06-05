import { existsSync, mkdirSync } from 'fs';
import { google, sheets_v4 } from 'googleapis';
import ora from 'ora';

import { authorize } from './authorize';
import { retry } from './convert';
import { Options } from './types/options';
import { Response } from './types/response';
import { directories } from './util/directories';
import { sanitize } from './util/sanitize';
import { wait } from './util/wait';

/**
 * Convert Google Spreadsheets into JSON.
 * @param  id      The ID of the spreadsheet to convert.
 * @param  verbose Determines if the tab name should be printed when converting.
 * @param  delay   Represents how long the program should wait between converting tabs, in milliseconds.
 * @param  dir     The directory that holds the credentials and tokens file.
 * @param  data    Determines where converted JSON files will be stored.
 * @param  exclude A list of sheet names to ignore and not convert.
 * @param  include A list of sheet names to only convert.
 * @return         An object containing information about converted tabs.
 * @examples
 * ```typescript
 *
 * const { Sheets } = require('@norviah/sheets');
 *
 * // To get the ID of a sheet, grab the long random string in the URL, for
 * // example, if we want to generate JSON files for the Animal Crossing New
 * // Horizons spreadsheet, the URL being: https://tinyurl.com/acnh-sheet,
 * // the ID would be '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4'.
 *
 * // So to generate JSON files for that spreadsheet, we'll do:
 * sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { [ options ] });
 *
 * // By default, the JSON files will be saved in the sub-directory 'data' under
 * // the project's root. If you want to change this location, you can do so by:
 * sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { data: '[path]' });
 *
 * ```
 */
async function sheets(id: string, { verbose = false, delay = 0, dir = directories.config, data = directories.data, exclude = [], include = [] }: Options = {}): Promise<Response> {
  // Make sure that the config directory exists.
  if (!existsSync(dir)) {
    throw new Error(`The directory '${dir}' does not exist.`);
  }

  // Initialize a new authorized client with Google's API.
  const client: sheets_v4.Sheets = google.sheets({ version: 'v4', auth: await authorize(dir) });

  // Make sure that the 'data' directory exists as this directory is where the
  // converted JSON files will be saved under.
  if (!existsSync(data)) {
    mkdirSync(data, { recursive: true });
  }

  // Get information about the given sheet.
  const spreadsheet = await client.spreadsheets.get({ spreadsheetId: id }).catch(() => {
    throw new Error(`The sheet ID '${id}' couldn't be found.`);
  });

  // Get a list of tab names from the spreadsheet.
  const tabs: (string | null | undefined)[] | undefined = spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title);

  if (!tabs) {
    throw new Error("Couldn't get the names for each tab from the spreadsheet.");
  }

  // If the user wants, initialize a new ora instance.
  const spinner: ora.Ora | null = verbose ? ora() : null;

  // Sanitize the list of tab names to remove undefined and/or null.
  const sanitized: string[] = tabs.filter(sanitize);

  // Initialize an array removing unwanted tabs from the list.
  const excluded = sanitized.filter((name) => !exclude.includes(name));

  // Then, initialize a new array consisting of only the tab names that the user
  // wants to convert, only if the 'include' array has values.
  const names = excluded.filter((name) => (include.length ? include.includes(name) : true));

  for (const name of names) {
    spinner?.start(`converting: ${name}`);

    if (delay > 0) {
      await wait(delay);
    }

    // Implement a back off system for converting spreadsheets into JSON, if
    // an error occurs, the program pauses for 30 seconds before trying the next
    // attempt. The program exists once it meets the max amount of attempts.
    await retry(client, id, name, data, spinner);

    spinner?.succeed(`finished: ${name}`);
  }

  return { converted: names, names: sanitized, dir, data } as Response;
}

export { sheets };
