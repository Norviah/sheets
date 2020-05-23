[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["authorize"](_authorize_.md)

# Module: "authorize"

## Index

### Functions

* [authorize](_authorize_.md#authorize)
* [generateTokens](_authorize_.md#generatetokens)

## Functions

###  authorize

▸ **authorize**(`dir`: string): *Promise‹OAuth2Client›*

Defined in authorize.ts:48

Initializes a new client with Google's API and returns that reference.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dir` | string | The base directory that holds the credentials and tokens file. |

**Returns:** *Promise‹OAuth2Client›*

An authorized client with Google's API.

___

###  generateTokens

▸ **generateTokens**(`client`: OAuth2Client, `dir`: string): *Promise‹OAuth2Client›*

Defined in authorize.ts:17

Generates new tokens for the client and saves
the generated token to the given directory.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | OAuth2Client | The Google Sheets client. |
`dir` | string | Where the generated tokens will be stored. |

**Returns:** *Promise‹OAuth2Client›*

The given client authorized.
