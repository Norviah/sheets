[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["util/config"](_util_config_.md)

# Module: "util/config"

## Index

### Variables

* [maxAttempts](_util_config_.md#const-maxattempts)

## Variables

### `Const` maxAttempts

• **maxAttempts**: *number* = 3

*Defined in [util/config.ts:6](https://github.com/Norviah/sheets/blob/afa1154/src/util/config.ts#L6)*

Represents the max amount of attempts the program will try when trying to
convert Google Spreadsheets to JSON. An attempt isn't consistent with each
tab, and when this amount is met, the program exits.
