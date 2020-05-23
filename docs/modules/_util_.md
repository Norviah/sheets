[@norviah/sheets](../README.md) › [Globals](../globals.md) › ["util"](_util_.md)

# Module: "util"

## Index

### Functions

* [importJSON](_util_.md#importjson)
* [sanitize](_util_.md#sanitize)

## Functions

###  importJSON

▸ **importJSON**<**T**>(`path`: string): *T | null*

Defined in util.ts:8

Returns the path as a JSON object.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *T | null*

The path as a JSON object, if the path doesn't exist, null is returned.

___

###  sanitize

▸ **sanitize**<**T**>(`value`: T | null | undefined): *value is T*

Defined in util.ts:22

A helper function used to sanitize an array and remove
any values that are either null or undefined.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`value` | T &#124; null &#124; undefined |

**Returns:** *value is T*

Determines if the given value isn't null or undefined.
