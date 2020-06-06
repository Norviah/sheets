## @norviah/sheets

Convert Google Spreadsheets into JSON. In order to use this package, you **must** enable the Google Sheets API for your Google account, which can be done [here](https://developers.google.com/sheets/api/quickstart/nodejs#step_1_turn_on_the).

Click the `Enable the Google Sheets API` button and create a new application for a `Desktop app`. Once you have created an application, you'll be presented with your `Client ID`, `Client  Secret`, and a button named `Download Client Configuration`. Click this button and download your configuration file as this is your `credentials.json` file and this file is used to authorize this application. Save this file in the sub-directory `config` under your project's root directory.

### Installation

```
npm install @norviah/sheets
```

### Usage

Your `credentials.json` file should be saved in the sub-directory `config` under your project's root directory, if wanted, you can save this file in another directory and point that directory to `sheets` during execution.

To convert a Google Spreadsheet into JSON, you'll need the spreadsheet's ID, which is the long random string in the URL. For example, to convert the [Animal Crossing: New Horizons Spreadsheet], the ID is `13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4`.

If `sheets` encounters an error while converting, which is probably Google rate limiting `sheets`, `sheets` will attempt to convert that tab again, up to three times. If an error still occurs for the third attempt, an error is thrown.

When using `sheets`, to convert a spreadsheet, you need to give an object containing the spreadsheet's ID, and optionally providing an array representing the tabs you want `sheets` to either ignore and/or exclude.

The usage for `sheets` looks like:

```javascript
sheets({ /** spreadsheet information */ }, { /** options */ })
```

To convert a spreadsheet using `sheets`, you must provide an object containing:
- id `string`: The spreadsheet's ID.
- include `string[]`: Optional, a list of tab names to only convert.
- exclude `string[]`: Optional, a list of tab names to ignore and not convert.
- data `string`: Optional, `sheets` will save this spreadsheet's JSON file in this specific directory. If this value isn't provided, `sheets` will default to the `data` directory in the `options` object, and if that value isn't provided, `sheets` will default to the sub-directory `data` in the project's root directory.

To convert multiple spreadsheets, you can provide an array of objects:

```javascript
sheets([{ /** spreadsheet information */ }, { /** spreadsheet information */ }], { /** options */ })
```

## Examples

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
// a value for 'data' in the 'options' object:
sheets({ id: '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4' }, { id:  '1BjqVeqIrfEezvyrWLUrwMjmK_UbY2LXkZ12mttamTtk' }, { data: '/User/norviah/Desktop' });

// If wanted, you can provide a 'data' value in each spreadsheet, and the JSON
// files for that specific spreadsheet, will be saved in that directory.
sheets({ id: '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', data: '/Users/norviah/Documents' }, { id:  '1BjqVeqIrfEezvyrWLUrwMjmK_UbY2LXkZ12mttamTtk' }, { data: '/User/norviah/Desktop' });

// Note that if a directory does not exist, `sheets` will recursively create it. 

```

For more documentation, visit the [documentation](https://github.com/Norviah/sheets/blob/master/docs) directory.
