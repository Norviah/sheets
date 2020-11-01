[@norviah/sheets](README.md) › [Globals](globals.md)

# @norviah/sheets

Convert Google Spreadsheets into JSON. In order to use this package, you **must** enable the Google Sheets API for your Google account, which can be done [here](https://developers.google.com/sheets/api/quickstart/nodejs#step_1_turn_on_the).

Click the `Enable the Google Sheets API` button and create a new application for a `Desktop app`. Once you have created an application, you'll be presented with your `Client ID`, `Client  Secret`, and a button named `Download Client Configuration`. Click this button and download your configuration file as this is your `credentials.json` file and this file is used to authorize this application. Save this file in the sub-directory `config` under your project's root directory.

### Installation

```
npm install @norviah/sheets
```

### Usage

Your `credentials.json` file should be saved in the sub-directory `config` under your project's root directory, if wanted, you can save this file in another directory and point that directory to `sheets` during execution.

To use this module, you'll need the ID of a spreadsheet, which is the long random string in the URL. For example, if you want to convert the [Animal Crossing: New Horizons Spreadsheet](https://tinyurl.com/acnh-sheet), you'll need the ID, which is `13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4`.

If `sheets` encounters an error while converting, which is most likely Google rate limiting the program, `sheets` will attempt to convert that tab again, up to three times. If an error still occurs for the third attempt, an error is thrown.

The usage for `sheets` looks like:

```javascript
sheets({ /** spreadsheet */ }, { /** options */ })
```

To convert a spreadsheet using `sheets`, you must provide an object containing:
- id `string`: The spreadsheet's ID.
- include `string[]`: Optional, a list of tab names to only convert.
- exclude `string[]`: Optional, a list of tab names to ignore and not convert.
- dir `string`: Optional, `sheets` will save this spreadsheet's JSON file in this specific directory. If this value isn't provided, `sheets` will default to the `dir` directory in the `options` object, and if that value isn't provided, `sheets` will default to the sub-directory `data` in the project's root directory.

To convert multiple spreadsheets, you can provide an array of objects:

```javascript
sheets([{ /** spreadsheet */ }, { /** spreadsheet */ }], { /** options */ })
```

### Examples

```javascript

// Node.js
const { sheets } = require('@norviah/sheets');

// Typescript
import { sheets } from '@norviah/sheets';

// To continue off of the example above, if you want to convert the AC: NH
// Spreadsheet, or any other spreadsheet, we'll do:
sheets({ id: '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4' });

// You can also convert multiple spreadsheets, pass in an array containing
// objects representing the IDs of each spreadsheet:
sheets({ id: '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4' }, { id:  '1BjqVeqIrfEezvyrWLUrwMjmK_UbY2LXkZ12mttamTtk' });

// To change the directory that converted JSON files will be stored, pass in
// a value for 'dir' in the 'options' object:
sheets({ id: '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4' }, { id:  '1BjqVeqIrfEezvyrWLUrwMjmK_UbY2LXkZ12mttamTtk' }, { dir: '/User/norviah/Desktop' });

// If wanted, you can provide a 'dir' value in each spreadsheet, and the JSON
// files for that specific spreadsheet, will be saved in that directory.
sheets({ id: '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', dir: '/Users/norviah/Documents' }, { id:  '1BjqVeqIrfEezvyrWLUrwMjmK_UbY2LXkZ12mttamTtk' }, { dir: '/User/norviah/Desktop' });

// Note that if a directory does not exist, it will be created recursively.

```

For more documentation, visit the [documentation](https://github.com/Norviah/sheets/blob/master/docs) directory.
