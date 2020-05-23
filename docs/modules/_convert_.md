[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["convert"](_convert_.md)

# Module: "convert"

## Index

### Functions

* [convert](_convert_.md#convert)

## Functions

###  convert

▸ **convert**(`client`: Sheets, `id`: string, `name`: string, `dir`: string, `verbose`: boolean): *Promise‹void›*

Defined in convert.ts:15

Converts the given sheet name into a JSON file.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | Sheets | The authorized Google Sheets client. |
`id` | string | The ID of the sheet. |
`name` | string | The name of the sheet to convert. |
`dir` | string | The directory that we'll save the JSON file to. |
`verbose` | boolean | Determines if the sheet name should be printed.  |

**Returns:** *Promise‹void›*
