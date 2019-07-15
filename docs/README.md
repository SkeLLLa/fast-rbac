> **[fast-rbac](README.md)**

[RBAC](README.md) /

RBAC classref

## Hierarchy

* **RBAC**

### Index

#### Interfaces

* [OperationRules](interfaces/rbac.operationrules.md)
* [Options](interfaces/rbac.options.md)
* [Refs](interfaces/rbac.refs.md)
* [ResourcePermission](interfaces/rbac.resourcepermission.md)
* [ResourceRules](interfaces/rbac.resourcerules.md)
* [RoleRules](interfaces/rbac.rolerules.md)
* [RulesObject](interfaces/rbac.rulesobject.md)

#### Type aliases

* [WhenFn](README.md#static-whenfn)

#### Constructors

* [constructor](README.md#constructor)

#### Methods

* [add](README.md#add)
* [can](README.md#can)
* [remove](README.md#remove)

## Type aliases

### `Static` WhenFn

Ƭ **WhenFn**: *function*

Defined in index.ts:216

Dynamic condition check function.

#### Type declaration:

▸ (`context`: any): *boolean | `Promise<boolean>`*

**Parameters:**

Name | Type |
------ | ------ |
`context` | any |

## Constructors

###  constructor

\+ **new RBAC**(`options`: [Options](interfaces/rbac.options.md)): *[RBAC](README.md)*

Defined in index.ts:44

RBAC constructor

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`options` | [Options](interfaces/rbac.options.md) |  {} | RBAC options  |

**Returns:** *[RBAC](README.md)*

## Methods

###  add

▸ **add**(`role`: string, `resource`: string, `operation`: string, `when?`: [WhenFn](README.md#static-whenfn)): *void*

Defined in index.ts:95

Adds new role to rules.

**`version`** 1.1.X

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`role` | string | user role |
`resource` | string | resource to access |
`operation` | string | allowed operation |
`when?` | [WhenFn](README.md#static-whenfn) | function for additional checks  |

**Returns:** *void*

___

###  can

▸ **can**(`role`: string, `resource`: string, `operation?`: undefined | string): *boolean*

Defined in index.ts:153

Checks if user can perform operation without checking when condition.

**`version`** 1.X.X

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`role` | string | user role |
`resource` | string | resource to access |
`operation?` | undefined \| string | operation on resource |

**Returns:** *boolean*

true if role has access to resources

▸ **can**(`role`: string, `resource`: string, `operation`: string, `context`: any): *`Promise<boolean>`*

Defined in index.ts:165

Checks if user can perform operation with checking when condition if it's provided.

**`version`** 1.X.X

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`role` | string | user role |
`resource` | string | resource to access |
`operation` | string | operation on resource |
`context` | any | context passed to when function, set it to null |

**Returns:** *`Promise<boolean>`*

true if role has access to resources.

___

###  remove

▸ **remove**(`role`: string, `resource`: string, `operation`: string): *void*

Defined in index.ts:116

Remove rule(s).

**`version`** 1.1.X

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`role` | string | - | user role |
`resource` | string | "*" | resource to access |
`operation` | string | "*" | operation  |

**Returns:** *void*