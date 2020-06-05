[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["convert"](_convert_.md)

# Module: "convert"

## Index

### Functions

* [convert](_convert_.md#convert)
* [handler](_convert_.md#handler)
* [retry](_convert_.md#retry)

## Functions

###  convert

▸ **convert**(`client`: Sheets, `id`: string, `name`: string, `dir`: string): *Promise‹void›*

*Defined in [convert.ts:17](https://github.com/Norviah/sheets/blob/20a3574/src/convert.ts#L17)*

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

###  handler

▸ **handler**(`error`: any, `attempt`: number, `spinner`: Ora | null): *boolean*

*Defined in [convert.ts:53](https://github.com/Norviah/sheets/blob/20a3574/src/convert.ts#L53)*

This function is executed if an error occurs while converting, if the given
attempt number is the maximum allowed attempt, the program is terminated

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | any | The error that was thrown. |
`attempt` | number | The number of the next attempt. |
`spinner` | Ora &#124; null | The ora instance, if one exists. |

**Returns:** *boolean*

Determines if the program should continue to attempt.

___

###  retry

▸ **retry**(`client`: Sheets, `id`: string, `name`: string, `dir`: string, `spinner`: Ora | null): *Promise‹void›*

*Defined in [convert.ts:79](https://github.com/Norviah/sheets/blob/20a3574/src/convert.ts#L79)*

Implements a backoff system while trying to convert spreadsheets to JSON.
When trying to convert and an error occurs, we'll try to convert that convert
that tab again, up to maxAttempts, when this amount is met, the program ends.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | Sheets | The authorized Google Spreadheets client. |
`id` | string | The ID of the spreadsheet. |
`name` | string | The name of the sheet to convert. |
`dir` | string | The directory that we'll save the JSON file to. |
`spinner` | Ora &#124; null | The ora instance, if one exists.  |

**Returns:** *Promise‹void›*
