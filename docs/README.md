[@norviah/sheets](README.md) › [Globals](globals.md)

# @norviah/sheets

Convert Google Sheets into JSON files. In order to use this module, you **must** enable the Google Sheets API for your google account which can be done at step 1 [here](https://developers.google.com/sheets/api/quickstart/nodejs#step_1_turn_on_the).

Click the `Enable the Google Sheets API` button and create an application for a `Desktop App`. Once created, download the `credentials.json` file by clicking the button, once downloaded, copy this file into the sub-directory `config` under your project's root.

### Installation

`npm install @norviah/sheets`

### Usage

Your `credentials.json` file should be saved under the sub-directory `config` under your project's root, if need be, you can store it in another directory and point that directory to `Sheets` at runtime.

To convert a Google Sheet into JSON, you must have the Sheet's ID, which is the long random string in the URL, for example, if you want to convert the sheet for [Animal Crossing: New Horizons Spreadsheet](https://tinyurl.com/acnh-sheet), the url being:
`https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit#gid=1367413844`,
the ID would be `13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4`.

The basic usage for `Sheets` is

```typescript

const { Sheets } = require("@norviah/sheets");

// So, to continue off of the example above, if you want to
// convert the Animal Crossing: New Horizons Spreadsheet to JSON,
// you can do like:

Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4');

// If you have you 'credentials.json' file stored in another directory,
// you can tell 'Sheets' by passing in a value for 'dir'. If I had my credentials
// stored in my Desktop, for example, I would point that to 'Sheets' by doing:

Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { dir: '/Users/norviah/Desktop' });

// By default, 'Sheets' will store JSON files into the 'data' sub-directory
// under the project's root. If wanted, you can point in another directory by:

Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { data: '/Users/norviah/Desktop' });

```

For more documentation, visit the [documentation](https://github.com/Norviah/sheets/blob/master/docs) directory, specifically [here](https://github.com/Norviah/sheets/blob/master/docs/modules/_index_.md).
