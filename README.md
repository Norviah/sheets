### Sheets

Convert Google Sheets into local JSON files. Before continuing, you must enable the Google Sheets API for your Google account, which can be done [here](https://developers.google.com/sheets/api/quickstart/nodejs). Once enabled, save the file as `credentials.json` under a `config` directory in the root directory of the project.

### Installation

`npm install @norviah/sheets`

### Documentation

The usage for sheets is `sheets(id, options)`.

**id** `string`

The ID of the Google Sheets that you would like to convert to JSON, for example, if we have the Google Sheets for the [Animal Crossing: New Horizons Spreadsheet](https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit#gid=1367413844), the ID would be `13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4`.

**options** `object`

**options.path** `string` The absolute directory that will store the JSON files, if no path is given, the `data` directory under the root directory will be used.

**options.verbose** `boolean` Determines if you want the program to output the tabs that it's currently converting.

### Usage

```javascript
const sheets = require("@norviah/sheets");

// Converts the Animal Crossing: New Horizons Spreadsheet to JSON files
// and stores it under the `data` directory in the root directory.
sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4');
```
