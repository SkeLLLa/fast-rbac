[fast-rbac](README.md)

# fast-rbac

## Index

### Classes

* [RBAC](classes/rbac.md)

### Variables

* [SEPARATOR](README.md#const-separator)

### Functions

* [flatten](README.md#private-flatten)
* [mergeRoles](README.md#private-mergeroles)

## Variables

### `Const` SEPARATOR

• **SEPARATOR**: *":"* = ":"

Defined in index.ts:3

## Functions

### `Private` flatten

▸ **flatten**(`object`: object, `separator`: string): *object*

Defined in utils.ts:4

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`object` | object | - |
`separator` | string | "." |

**Returns:** *object*

* \[ **key**: *string*\]: any

___

### `Private` mergeRoles

▸ **mergeRoles**(`dst`: object, ...`srcs`: Array‹object›): *object*

Defined in utils.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`dst` | object |
`...srcs` | Array‹object› |

**Returns:** *object*

* \[ **key**: *string*\]: any
