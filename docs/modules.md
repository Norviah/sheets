[@norviah/sheets](README.md) / Exports

# @norviah/sheets

## Table of contents

### Interfaces

- [Options](interfaces/Options.md)
- [Response](interfaces/Response.md)
- [Spreadsheet](interfaces/Spreadsheet.md)

### Functions

- [sheets](modules.md#sheets)

## Functions

### sheets

▸ **sheets**(`spreadsheets`, `__namedParameters?`): `Promise`<[`Response`](interfaces/Response.md)\>

Convert Google Spreadsheets into JSON.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spreadsheets` | [`Spreadsheet`](interfaces/Spreadsheet.md) \| [`Spreadsheet`](interfaces/Spreadsheet.md)[] | A list of spreadsheets to convert. |
| `__namedParameters` | [`Options`](interfaces/Options.md) | - |

#### Returns

`Promise`<[`Response`](interfaces/Response.md)\>

Represents information about what was converted.

#### Defined in

[index.ts:23](https://github.com/Norviah/sheets/blob/8d1b013/src/index.ts#L23)
