[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Functions

* [sheets](_index_.md#sheets)

## Functions

###  sheets

▸ **sheets**(`id`: string, `__namedParameters`: object): *Promise‹[Response](_types_response_.md#response)›*

*Defined in [index.ts:42](https://github.com/Norviah/sheets/blob/0dd079d/src/index.ts#L42)*

Convert Google Spreadsheets into JSON.

**`examples`** 
```typescript

const { Sheets } = require('@norviah/sheets');

// To get the ID of a sheet, grab the long random string in the URL, for
// example, if we want to generate JSON files for the Animal Crossing New
// Horizons spreadsheet, the URL being: https://tinyurl.com/acnh-sheet,
// the ID would be '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4'.

// So to generate JSON files for that spreadsheet, we'll do:
sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { [ options ] });

// By default, the JSON files will be saved in the sub-directory 'data' under
// the project's root. If you want to change this location, you can do so by:
sheets('13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4', { data: '[path]' });

```

**Parameters:**

▪ **id**: *string*

The ID of the spreadsheet to convert.

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`data` | string | directories.data | Determines where converted JSON files will be stored. |
`delay` | number | 0 | Represents how long the program should wait between converting tabs, in milliseconds. |
`dir` | string | directories.config | The directory that holds the credentials and tokens file. |
`exclude` | string[] | [] | A list of sheet names to ignore and not convert. |
`include` | string[] | [] | A list of sheet names to only convert. |
`verbose` | boolean | false | Determines if the tab name should be printed when converting. |

**Returns:** *Promise‹[Response](_types_response_.md#response)›*

An object containing information about converted tabs.
