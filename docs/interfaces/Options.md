[@norviah/sheets](../README.md) / [Exports](../modules.md) / Options

# Interface: Options

## Table of contents

### Properties

- [config](Options.md#config)
- [delay](Options.md#delay)
- [dir](Options.md#dir)
- [separator](Options.md#separator)
- [verbose](Options.md#verbose)

## Properties

### config

• `Optional` **config**: `string`

The directory that holds the credentials and tokens file.

#### Defined in

[types/options.ts:15](https://github.com/Norviah/sheets/blob/63eddfd/src/types/options.ts#L15)

___

### delay

• `Optional` **delay**: `number`

Represents how long the program should wait between converting tabs, in milliseconds.

#### Defined in

[types/options.ts:10](https://github.com/Norviah/sheets/blob/63eddfd/src/types/options.ts#L10)

___

### dir

• `Optional` **dir**: `string`

Determines where converted JSON files will be stored.

#### Defined in

[types/options.ts:20](https://github.com/Norviah/sheets/blob/63eddfd/src/types/options.ts#L20)

___

### separator

• `Optional` **separator**: `string`

If a tab is found to contain a path separator, all instances will be
replaced with this string, or `-` by default.

#### Defined in

[types/options.ts:26](https://github.com/Norviah/sheets/blob/63eddfd/src/types/options.ts#L26)

___

### verbose

• `Optional` **verbose**: `boolean`

Determines if the tab name should be printed when converting.

#### Defined in

[types/options.ts:5](https://github.com/Norviah/sheets/blob/63eddfd/src/types/options.ts#L5)
