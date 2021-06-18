[Fast RBAC - v1.3.0](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / RBAC

# Class: RBAC

[index](../modules/index.md).RBAC

RBAC classref

## Table of contents

### Constructors

- [constructor](index.rbac-1.md#constructor)

### Methods

- [add](index.rbac-1.md#add)
- [can](index.rbac-1.md#can)
- [remove](index.rbac-1.md#remove)

## Constructors

### constructor

• **new RBAC**(`options?`)

RBAC constructor

#### Parameters

| Name      | Type                                           | Description  |
| :-------- | :--------------------------------------------- | :----------- |
| `options` | [Options](../interfaces/index.rbac.options.md) | RBAC options |

#### Defined in

[index.ts:44](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L44)

## Methods

### add

▸ **add**(`role`, `resource`, `operation`, `when?`): `void`

Adds new role to rules.

**`version`** 1.1.X

#### Parameters

| Name        | Type                                            | Description                    |
| :---------- | :---------------------------------------------- | :----------------------------- |
| `role`      | `string`                                        | user role                      |
| `resource`  | `string`                                        | resource to access             |
| `operation` | `string`                                        | allowed operation              |
| `when?`     | [WhenFn](../modules/index.rbac.md#whenfn)<any\> | function for additional checks |

#### Returns

`void`

#### Defined in

[index.ts:95](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L95)

---

### can

▸ **can**(`role`, `resource`, `operation?`): `boolean`

Checks if user can perform operation without checking when condition.

**`version`** 1.X.X

#### Parameters

| Name         | Type     | Description           |
| :----------- | :------- | :-------------------- |
| `role`       | `string` | user role             |
| `resource`   | `string` | resource to access    |
| `operation?` | `string` | operation on resource |

#### Returns

`boolean`

true if role has access to resources

#### Defined in

[index.ts:153](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L153)

▸ **can**<TContext\>(`role`, `resource`, `operation`, `context`): `Promise`<boolean\>

Checks if user can perform operation with checking when condition if it's provided.

**`version`** 1.X.X

#### Type parameters

| Name       | Type               |
| :--------- | :----------------- |
| `TContext` | `TContext` = `any` |

#### Parameters

| Name        | Type       | Description                                     |
| :---------- | :--------- | :---------------------------------------------- |
| `role`      | `string`   | user role                                       |
| `resource`  | `string`   | resource to access                              |
| `operation` | `string`   | operation on resource                           |
| `context`   | `TContext` | context passed to when function, set it to null |

#### Returns

`Promise`<boolean\>

true if role has access to resources.

#### Defined in

[index.ts:165](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L165)

---

### remove

▸ **remove**(`role`, `resource?`, `operation?`): `void`

Remove rule(s).

**`version`** 1.1.X

#### Parameters

| Name        | Type     | Default value | Description        |
| :---------- | :------- | :------------ | :----------------- |
| `role`      | `string` | `undefined`   | user role          |
| `resource`  | `string` | '\*'          | resource to access |
| `operation` | `string` | '\*'          | operation          |

#### Returns

`void`

#### Defined in

[index.ts:116](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L116)
