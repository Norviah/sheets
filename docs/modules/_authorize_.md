[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["authorize"](_authorize_.md)

# Module: "authorize"

## Index

### Variables

* [scopes](_authorize_.md#const-scopes)

### Functions

* [authorize](_authorize_.md#authorize)
* [generateTokens](_authorize_.md#generatetokens)

## Variables

### `Const` scopes

• **scopes**: *string[]* = ['https://www.googleapis.com/auth/spreadsheets.readonly']

*Defined in [authorize.ts:15](https://github.com/Norviah/sheets/blob/20a3574/src/authorize.ts#L15)*

Represents the scopes that this project will use, we just need to read
information from spreadsheets, so we'll use the 'readonly' scope.

## Functions

###  authorize

▸ **authorize**(`dir`: string): *Promise‹OAuth2Client›*

*Defined in [authorize.ts:55](https://github.com/Norviah/sheets/blob/20a3574/src/authorize.ts#L55)*

Initializes a new client with Google's API and returns that reference.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dir` | string | directories.config | The root directory that holds the credentials and tokens file. |

**Returns:** *Promise‹OAuth2Client›*

An authorized client with Google's API.

___

###  generateTokens

▸ **generateTokens**(`client`: OAuth2Client, `dir`: string): *Promise‹OAuth2Client›*

*Defined in [authorize.ts:24](https://github.com/Norviah/sheets/blob/20a3574/src/authorize.ts#L24)*

Generates tokens for the client and saves the tokens to the given directory,
the client is authorized with the generated tokens and is returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | OAuth2Client | The unauthorized client with Google's API. |
`dir` | string | Represents where the generated tokens will be saved to. |

**Returns:** *Promise‹OAuth2Client›*

The client authorized with Google's API.
