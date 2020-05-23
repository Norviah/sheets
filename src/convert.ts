import { writeFileSync } from 'fs';
import { sheets_v4 } from 'googleapis';
import { zipObject } from 'lodash';
import ora from 'ora';
import { join } from 'path';

/**
 * Converts the given sheet name into a JSON file.
 * @param client  The authorized Google Sheets client.
 * @param id      The ID of the sheet.
 * @param name    The name of the sheet to convert.
 * @param dir     The directory that we'll save the JSON file to.
 * @param verbose Determines if the sheet name should be printed.
 */
async function convert(client: sheets_v4.Sheets, id: string, name: string, dir: string, verbose: boolean): Promise<void> {
  // Initialize a new spinner instance if wanted.
  const spinner = verbose ? ora().start(`converting: ${name}`) : undefined;

  // Initialize an array to hold references to all converted data.
  const data: any[] = [];

  // Call the client for information about the given sheet name.
  const response = await client.spreadsheets.values.get({ spreadsheetId: id, range: name, valueRenderOption: 'FORMULA', dateTimeRenderOption: 'FORMATTED_STRING' });

  if (!response.data.values) {
    return console.error(`Couldn't get information for the sheet: ${name}`);
  }

  // For every Google Sheet, the first table represents the name
  // for each column, with the rest of the tables being the actual
  // values. Here, we separate those values into their own variables.
  const [header, ...rows] = response.data.values;

  // As we know that 'header' represents the names for the tables,
  // we use lodash to initialize a new object. zipObject takes two arrays
  // and generates a new object with the first array representing
  // the key and the second array representing the value.
  for (const row of rows) {
    data.push({ SourceSheet: name, ...zipObject(header, row) });
  }

  // Write the converted data into the given directory.
  writeFileSync(join(dir, `${name}.json`), JSON.stringify(data, null, 2));

  // End the spinner if one was initialized.
  if (spinner) {
    spinner.succeed(`finished: ${name}`);
  }
}

export { convert };
