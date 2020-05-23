[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["config"](_config_.md)

# Module: "config"

## Index

### Variables

* [config](_config_.md#const-config)
* [credentials](_config_.md#const-credentials)
* [data](_config_.md#const-data)
* [root](_config_.md#const-root)
* [scopes](_config_.md#const-scopes)
* [tokens](_config_.md#const-tokens)

## Variables

### `Const` config

• **config**: *string* = join(path, 'config')

Defined in config.ts:18

Represents the default directory that will hold config files.

___

### `Const` credentials

• **credentials**: *string* = join(config, 'credentials.json')

Defined in config.ts:23

The default directory that holds the credentials file.

___

### `Const` data

• **data**: *string* = join(root, 'data')

Defined in config.ts:33

Represents the directory where the JSON files will be stored.

___

### `Const` root

• **root**: *string* = path

Defined in config.ts:13

The absolute path for this project's root.

___

### `Const` scopes

• **scopes**: *string[]* = ['https://www.googleapis.com/auth/spreadsheets.readonly']

Defined in config.ts:8

Represents the scopes that this project will use,
since we just need to read data from sheets, we use the 'readonly' scope.

___

### `Const` tokens

• **tokens**: *string* = join(config, 'tokens.json')

Defined in config.ts:28

The default directory that holds the tokens file.
