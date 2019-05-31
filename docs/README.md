
#  RBAC

## Hierarchy

**RBAC**

## Index

### Interfaces

* [OperationRules](interfaces/rbac.operationrules.md)
* [Options](interfaces/rbac.options.md)
* [Refs](interfaces/rbac.refs.md)
* [ResourcePermission](interfaces/rbac.resourcepermission.md)
* [ResourceRules](interfaces/rbac.resourcerules.md)
* [RoleRules](interfaces/rbac.rolerules.md)
* [RulesObject](interfaces/rbac.rulesobject.md)

### Type aliases

* [WhenFn](#whenfn)

### Constructors

* [constructor](#constructor)

### Methods

* [add](#add)
* [can](#can)

---

## Type aliases

<a id="whenfn"></a>

### `<Static>` WhenFn

**Ƭ WhenFn**: *`function`*

*Defined in index.ts:169*

#### Type declaration
▸(context: *`any`*): `boolean` \| `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| context | `any` |

**Returns:** `boolean` \| `Promise`<`boolean`>

___

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RBAC**(options: *[Options](interfaces/rbac.options.md)*): [RBAC]()

*Defined in index.ts:45*

RBAC constructor

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | [Options](interfaces/rbac.options.md) |  RBAC options |

**Returns:** [RBAC]()

___

## Methods

<a id="add"></a>

###  add

▸ **add**(_role: *`string`*, _resource: *`string`*, _permissions: *`Array`<`string`> \| `string`*, _when?: *[WhenFn](#whenfn)*): `void`

*Defined in index.ts:94*

Adds new role to rules.

*__todo__*: Not implemented yet

*__version__*: next

**Parameters:**

| Name | Type |
| ------ | ------ |
| _role | `string` |
| _resource | `string` |
| _permissions | `Array`<`string`> \| `string` |
| `Optional` _when | [WhenFn](#whenfn) |

**Returns:** `void`

___
<a id="can"></a>

###  can

▸ **can**(role: *`string`*, resource: *`string`*, operation?: *`undefined` \| `string`*): `boolean`

▸ **can**(role: *`string`*, resource: *`string`*, operation: *`string`*, context: *`any`*): `Promise`<`boolean`>

*Defined in index.ts:110*

Checks if user can perform operation without checking when condition.

*__version__*: 1.X.X

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| role | `string` |  user role |
| resource | `string` |  resource to access |
| `Optional` operation | `undefined` \| `string` |  operation on resource |

**Returns:** `boolean`
true if role has access to resources

*Defined in index.ts:121*

Checks if user can perform operation with checking when condition if it's provided.

*__version__*: 1.X.X

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| role | `string` |  user role |
| resource | `string` |  resource to access |
| operation | `string` |  operation on resource |
| context | `any` |  context passed to when function, set it to null |

**Returns:** `Promise`<`boolean`>
true if role has access to resources.

___

