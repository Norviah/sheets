[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Functions

* [Sheets](_index_.md#sheets)

## Functions

###  Sheets

▸ **Sheets**(`id`: string, `__namedParameters`: object): *Promise‹[Response](_response_.md#response)›*

Defined in index.ts:56

Convert Google Sheets into JSON.

**`examples`** 
```typescript

const { Sheets } = require("@norviah/sheets");

// To get the ID of a sheet, grab the long random string in the URL, for example,
// if we want to convert the spreadsheet for Animal Crossing: New Horizons, the URL being:
// https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit#gid=1367413844,
// the ID would be '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4'.

// So, to generate JSON for that sheet, we'll do:
Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { [options] });

// By default, generated JSON files will be created under the sub-directory 'data' under
// the project's root. If you want to pass in a directory of your choosing, you can do so by:
Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { data: '[absolute path to the directory]' });

// Other possible options being:

// dir: string = The directory that holds the credentials and tokens file. Don't worry if
// you don't have tokens as one can be generated for you if the tokens file is absent.

// exclude: string[] = A list of sheet names to ignore and not convert.
// include: string[] = A list of sheet names to only convert.
// verbose: boolean  = If true, Sheets will print the sheet name while converting.

// After converting, Sheets will hold information about what has been
// converted and where the JSON files were stored, just in-case these values are wanted.
const sheets = await Sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4');

// sheets.names: string[]  = Represents the names of the sheets that were converted.
// sheets.sheets: string[] = Represents the names of all sheets that were available.
// sheets.dir: string      = Represents the path that contains the credentials and tokens file.
// sheets.data: string     = Represents the directory where the JSON files were stored.

```

**Parameters:**

▪ **id**: *string*

The ID of the sheet you want to convert to JSON.

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`data` | string | config.data | Represents where the converted JSON files will be stored. |
`dir` | string | config.config | The base directory that will store the credentials and tokens file. |
`exclude` | string[] | [] | Represents a list of sheets to ignore. |
`include` | string[] | [] | Represents a list of sheets that will only be converted. |
`verbose` | boolean | false | Determines if the program should print the sheet name when converting. |

**Returns:** *Promise‹[Response](_response_.md#response)›*
