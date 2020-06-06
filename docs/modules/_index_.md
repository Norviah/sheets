[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Functions

* [sheets](_index_.md#sheets)

## Functions

###  sheets

▸ **sheets**(`spreadsheets`: [Spreadsheet](../interfaces/_types_spreadsheet_.spreadsheet.md) | [Spreadsheet](../interfaces/_types_spreadsheet_.spreadsheet.md)[], `__namedParameters`: object): *Promise‹[Response](../interfaces/_types_response_.response.md)›*

*Defined in [index.ts:23](https://github.com/Norviah/sheets/blob/7510284/src/index.ts#L23)*

Convert Google Spreadsheets into JSON.

**Parameters:**

▪ **spreadsheets**: *[Spreadsheet](../interfaces/_types_spreadsheet_.spreadsheet.md) | [Spreadsheet](../interfaces/_types_spreadsheet_.spreadsheet.md)[]*

A list of spreadsheets to convert.

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`data` | string | directories.data | Determines where converted JSON files will be stored. |
`delay` | number | 0 | Represents how long the program should wait between tabs. |
`dir` | string | directories.config | The directory that holds your credentials and tokens. |
`verbose` | boolean | false | Determines if the tab name should be printed while converting. |

**Returns:** *Promise‹[Response](../interfaces/_types_response_.response.md)›*

Represents information about what was converted.
