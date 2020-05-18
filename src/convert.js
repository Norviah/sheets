const ora = require('ora');
const google = require('googleapis');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { zipObject } = require('lodash');
const { join } = require('path');

const config = require('./config');
const { authorize } = require('./authorize');

/**
 * Reads the given tab of the sheet and converts it into a JSON object.
 * @param  {OAuth2Client}  client  The client instance for Google's API.
 * @param  {String}        id      The ID of the sheet.
 * @param  {String}        name    The name of the tab.
 * @param  {String}        path    The directory that will store the generated JSON file.
 * @param  {Boolean}       verbose Determines if the program should log its status when working on the sheet.
 */
async function convert(client, id, name, path, verbose) {
  // If wanted, initialize a new spinner to state information about the status.
  const spinner = verbose ? ora().start(`converting: ${name}`) : null;

  // Initialize a new array to hold a referenced to all data.
  const data = [];

  // Get an array with all tables from the given tab.
  const response = await client.spreadsheets.values.get({ spreadsheetId: id, range: name, valueRenderOption: 'FORMULA', dateTimeRenderOption: 'FORMATTED_STRING' });

  // For every Google Sheet, the first table represents the name
  // for each column, so the first element is that table. So
  // we extract and separate that table into it's own variable.
  const [header, ...rows] = response.data.values;

  // Since the header variable represents the name for each column,
  // we use lodash to initialize a new object. zipObject takes
  // two arrays, and generates a new object with the first array
  // representing the keys and the second array representing the values.
  for (const row of rows) {
    data.push({ SourceSheet: name, ...zipObject(header, row) });
  }


  // Write the data into a JSON file.
  writeFileSync(join(path, `${name}.json`), JSON.stringify(data, null, 2));

  // If a spinner was initialized, end it.
  spinner && spinner.succeed(`finished: ${name}`);
}

/**
 * The main entry point for this program.
 * @param  {String}  id              The ID of the Google sheets to convert to JSON.
 * @param  {Object}  options         Optional options.
 * @param  {String}  options.path    The directory that will store the JSON files, if a path isn't given, '$root/data' is used.
 * @param  {Boolean} options.verbose Determines if the program should output the tabs that it's currently converting.
 */
async function sheets(id, options) {
  // Initialize a new client instance with Google's API.
  const client = google.google.sheets({ version: 'v4', auth: await authorize() });

  // Make sure that the given directory exists, which is
  // where we'll store converted JSON files.
  if (!existsSync(options.path ?? config.data)) {
    mkdirSync(options.path ?? config.data);
  }

  // Get information about the given sheet.
  const spreadsheet = await client.spreadsheets.get({ spreadsheetId: id });

  // Generate an array of the names of all tabs within the sheet.
  const names = spreadsheet.data.sheets.map((sheet) => sheet.properties.title);

  // Iterate through every tab and convert that
  // tab into a JSON file and save it into the given directory.
  for (const name of names) {
    await convert(client, id, name, options.path ?? config.data, options.verbose ?? true);
  }
}

module.exports = sheets;
