import { existsSync, mkdirSync } from 'fs';
import { google, sheets_v4 } from 'googleapis';
import ora from 'ora';

import { authorize } from './authorize';
import { retry } from './convert';
import { Options } from './types/options';
import { Response } from './types/response';
import { Spreadsheet } from './types/spreadsheet';
import { directories } from './util/directories';
import { sanitize } from './util/sanitize';
import { wait } from './util/wait';

/**
 * Convert Google Spreadsheets into JSON.
 * @param  spreadsheets A list of spreadsheets to convert.
 * @param  verbose      Determines if the tab name should be printed while converting.
 * @param  delay        Represents how long the program should wait between tabs.
 * @param  config       The directory that holds your credentials and tokens.
 * @param  dir          Determines where converted JSON files will be stored.
 * @return              Represents information about what was converted.
 */
async function sheets(spreadsheets: Spreadsheet | Spreadsheet[], { verbose = false, delay = 0, config = directories.config, dir = directories.data }: Options = {}): Promise<Response> {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Initialize a client with Google's API.
  const client: sheets_v4.Sheets = google.sheets({ version: 'v4', auth: await authorize(config) });

  // Make sure that the given parameter is an array.
  spreadsheets = Array.isArray(spreadsheets) ? spreadsheets : [spreadsheets];

  // If wanted, initialize a new Ora instance.
  const spinner: ora.Ora | null = verbose ? ora() : null;

  // Initialize a new object to reference the result.
  const result: Response = {};

  for (const information of spreadsheets) {
    // Make sure the 'dir' directory exists as this directory represents where
    // the converted JSON files will be stored.
    if (!existsSync(information.dir ?? dir)) {
      mkdirSync(information.dir ?? dir, { recursive: true });
    }

    // From the client, get information of the spreadsheet.
    const spreadsheet = await client.spreadsheets.get({ spreadsheetId: information.id }).catch((error: any) => {
      throw new Error(`The sheet ID '${information.id}' couldn't be found\n${error}`);
    });

    // Get a list of tabs from the spreadsheet.
    const tabs: (string | null | undefined)[] | undefined = spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title);

    if (!tabs) {
      throw new Error("Couldn't get the names for each tab from the spreadsheet.");
    }

    // Sanitize the list by removing undefined or null from the list of tabs.
    const sanitized: string[] = tabs.filter(sanitize);

    // Initialize an array removing unwanted tabs from the list.
    const excluded: string[] = sanitized.filter((name: string) => !information.exclude?.includes(name));

    // Then, initialize a new array consisting of only the tabs that the user
    // wants to convert, only if the 'includes' array has values.
    const names: string[] = excluded.filter((name) => (information.include?.length ? information.include?.includes(name) : true));

    for (const name of names) {
      spinner?.start(`converting: [${spreadsheet.data.properties?.title ?? 'Unknown'}] ${name}`);

      if (delay > 0) {
        await wait(delay);
      }

      // Here, we implement a backoff system for converting spreadsheets. If an
      // error occurs while converting, the system waits 30 seconds before
      // retrying. If an error occurs 3 times in a row, an error is thrown.
      await retry(client, information.id, name, information.dir ?? dir, spinner);
    }

    // Update the spinner's text to reflect the spreadsheet's title.
    spinner?.succeed(`finished: ${spreadsheet.data.properties?.title ?? 'Unknown'}`);

    result[information.id] = { converted: names, names: sanitized, dir, data: information.dir ?? dir };
  }

  return result;
}

export { sheets, Options, Spreadsheet, Response };
