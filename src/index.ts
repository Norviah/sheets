import { existsSync, mkdirSync } from 'fs';
import { google } from 'googleapis';

import { authorize } from './authorize';
import config from './config';
import { convert } from './convert';
import { Options } from './options';
import { Response } from './response';
import { sanitize } from './util';

/**
 * Convert Google Sheets into JSON.
 * @param  id       The ID of the sheet you want to convert to JSON.
 * @param  verbose  Determines if the program should print the sheet name when converting.
 * @param  dir      The base directory that will store the credentials and tokens file.
 * @param  data     Represents where the converted JSON files will be stored.
 * @param  exclude  Represents a list of sheets to ignore.
 * @param  include  Represents a list of sheets that will only be converted.
 * @examples
 * ```typescript
 *
 * const { Sheets } = require("@norviah/sheets");
 *
 * // To get the ID of a sheet, grab the long random string in the URL, for example,
 * // if we want to convert the spreadsheet for Animal Crossing: New Horizons, the URL being:
 * // https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit#gid=1367413844,
 * // the ID would be '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4'.
 *
 * // So, to generate JSON for that sheet, we'll do:
 * Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { [options] });
 *
 * // By default, generated JSON files will be created under the sub-directory 'data' under
 * // the project's root. If you want to pass in a directory of your choosing, you can do so by:
 * Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { data: '[absolute path to the directory]' });
 *
 * // Other possible options being:
 *
 * // dir: string = The directory that holds the credentials and tokens file. Don't worry if
 * // you don't have tokens as one can be generated for you if the tokens file is absent.
 *
 * // exclude: string[] = A list of sheet names to ignore and not convert.
 * // include: string[] = A list of sheet names to only convert.
 * // verbose: boolean  = If true, Sheets will print the sheet name while converting.
 *
 * // After converting, Sheets will hold information about what has been
 * // converted and where the JSON files were stored, just in-case these values are wanted.
 * const sheets = await Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4');
 *
 * // sheets.names: string[]  = Represents the names of the sheets that were converted.
 * // sheets.sheets: string[] = Represents the names of all sheets that were available.
 * // sheets.dir: string      = Represents the path that contains the credentials and tokens file.
 * // sheets.data: string     = Represents the directory where the JSON files were stored.
 *
 * ```
 */
async function Sheets(id: string, { verbose = false, dir = config.config, data = config.data, exclude = [], include = [] }: Options = {}): Promise<Response> {
  // Make sure that the directory
  // that holds the credentials file exists.
  if (!existsSync(dir)) {
    throw new Error(`The directory '${dir}' does not exist.`);
  }

  // Initialize a new client with Google's API.
  const client = google.sheets({ version: 'v4', auth: await authorize(dir) });

  // Make sure that the data directory exists as
  // this directory is where generated JSON files will be stored
  if (!existsSync(data)) {
    mkdirSync(data, { recursive: true });
  }

  // Get information about the given sheet.
  const spreadsheet = await client.spreadsheets.get({ spreadsheetId: id }).catch(() => {
    throw new Error(`The sheet ID '${id}' couldn't be found.`);
  });

  // Get a list of sheet names from the sheet.
  const names = spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title);

  if (!names) {
    throw new Error(`Couldn't get the names for the sheet.`);
  }

  // Sanitize the list of names to remove undefined or null values.
  const sanitized: string[] = names.filter(sanitize);

  // Initialize an array to remove un-wanted names from the list,
  const excluded = sanitized.filter((name) => !exclude.includes(name));

  // then, filter out the array to only include the values
  // given in the include parameter if values were given.
  const filtered = excluded.filter((name) => (include.length ? include.includes(name) : true));

  for (const name of filtered) {
    await convert(client, id, name, data, verbose);
  }

  // Return information about the process.
  return { converted: filtered, names: sanitized, dir, data };
}

export { Sheets };
