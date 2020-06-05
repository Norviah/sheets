[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["convert"](_convert_.md)

# Module: "convert"

## Index

### Functions

* [convert](_convert_.md#convert)
* [retry](_convert_.md#retry)

## Functions

###  convert

▸ **convert**(`client`: Sheets, `id`: string, `name`: string, `dir`: string): *Promise‹void›*

*Defined in [convert.ts:16](https://github.com/Norviah/sheets/blob/0dd079d/src/convert.ts#L16)*

Converts the given tab name from the spreadsheet into a JSON file.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | Sheets | The authorized Google Spreadheets client. |
`id` | string | The ID of the spreadsheet. |
`name` | string | The name of the sheet to convert. |
`dir` | string | The directory that we'll save the JSON file to.  |

**Returns:** *Promise‹void›*

___

###  retry

▸ **retry**(`client`: Sheets, `id`: string, `name`: string, `dir`: string, `spinner`: Ora | null): *Promise‹void›*

*Defined in [convert.ts:55](https://github.com/Norviah/sheets/blob/0dd079d/src/convert.ts#L55)*

Essentially a helper function for the 'convert' function, this function calls
'convert' method and, if an error occurs, it most likely means that the
project has been rate limited by Google. To combat this, we wait 30 seconds
and try to convert the given sheet again.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | Sheets | The authorized Google Spreadheets client. |
`id` | string | The ID of the spreadsheet. |
`name` | string | The name of the sheet to convert. |
`dir` | string | The directory that we'll save the JSON file to. |
`spinner` | Ora &#124; null | The ora instance, if one exists.  |

**Returns:** *Promise‹void›*
