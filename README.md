## @norviah/sheets

Convert Google Spreadsheets into JSON. In order to use this package, you **must** enable the Google Sheets API for your google account, which can be done [here](https://developers.google.com/sheets/api/quickstart/nodejs#step_1_turn_on_the).

Click the `Enable the Google Sheets API` button and create an application for `Desktop App`. Once you have created an application, you'll be presented with a window containing your `Client ID` token, `Client Secret` token, and a button named `DOWNLOAD CLIENT CONFIGURATION`. Click this button and download the configuration, as this is your `credentials.json` file, save this in the sub-directory `config` under your project's root directory.

### Installation

```
npm install @norviah/sheets
```

### Usage

Your `credentials.json` file should be saved under the sub-directory `config` in your project's root directory, if wanted, you can store this file in another directory and point that directory to `sheets` during runtime.

To convert a Google Spreadsheet into JSON, you'll need the spreadsheet's ID. For example, let's say we want to convert the [Animal Crossing: New Horizons Spreadsheet](https://tinyurl.com/acnh-sheet) into JSON, the ID is the long random string in the URL, so for this example, it'll be `13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4`.

The basic usage of `sheets` is

```javascript

// Node.js
const { sheets } = require('@norviah/sheets');

// Typescript
import { sheets } from '@norviah/sheets';

// To continue off of the example above, if you want to convert the Animal
// Crossing: New Horizons Spreadsheet to JSON, we'll do:
sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4');

// If you have saved your 'credentials.json' file in another directory, you
// can point that directory to sheets by doing:
sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { dir: '/Users/norviah/Documents/config/' });

// By default, converted JSON files will be saved into the sub-directory 'data'
// under the project's root directory, to change the directory, pass in a value
// for the 'data' option:
sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { data: '/Users/norviah/Desktop' });

```

For more documentation, visit the [documentation](https://github.com/Norviah/sheets/blob/master/docs) directory, specifically [here](https://github.com/Norviah/sheets/blob/master/docs/modules/_index_.md).
