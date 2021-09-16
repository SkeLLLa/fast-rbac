[Fast RBAC - v2.0.0](../README.md) / [index](../modules/index.md) / RBAC

# Class: RBAC

[index](../modules/index.md).RBAC

RBAC classref

## Table of contents

### Constructors

- [constructor](index.RBAC-1.md#constructor)

### Methods

- [add](index.RBAC-1.md#add)
- [can](index.RBAC-1.md#can)
- [remove](index.RBAC-1.md#remove)

## Constructors

### constructor

• **new RBAC**(`options?`)

RBAC constructor

#### Parameters

| Name      | Type                                             | Description  |
| :-------- | :----------------------------------------------- | :----------- |
| `options` | [`Options`](../interfaces/index.RBAC.Options.md) | RBAC options |

#### Defined in

[index.ts:50](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L50)

## Methods

### add

▸ **add**(`role`, `resource`, `operation`, `when?`): `void`

Adds new role to rules.

**`version`** 1.1.X

#### Parameters

| Name        | Type                                                | Description                    |
| :---------- | :-------------------------------------------------- | :----------------------------- |
| `role`      | `string`                                            | user role                      |
| `resource`  | `string`                                            | resource to access             |
| `operation` | `string`                                            | allowed operation              |
| `when?`     | [`WhenFn`](../modules/index.RBAC.md#whenfn)<`any`\> | function for additional checks |

#### Returns

`void`

#### Defined in

[index.ts:95](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L95)

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

[index.ts:153](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L153)

▸ **can**<`TContext`\>(`role`, `resource`, `operation`, `context`): `Promise`<`boolean`\>

Checks if user can perform operation with checking when condition if it's provided.

**`version`** 1.X.X

#### Type parameters

| Name       | Type  |
| :--------- | :---- |
| `TContext` | `any` |

#### Parameters

| Name        | Type       | Description                                     |
| :---------- | :--------- | :---------------------------------------------- |
| `role`      | `string`   | user role                                       |
| `resource`  | `string`   | resource to access                              |
| `operation` | `string`   | operation on resource                           |
| `context`   | `TContext` | context passed to when function, set it to null |

#### Returns

`Promise`<`boolean`\>

true if role has access to resources.

#### Defined in

[index.ts:165](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L165)

---

### remove

▸ **remove**(`role`, `resource?`, `operation?`): `void`

Remove rule(s).

**`version`** 1.1.X

#### Parameters

| Name        | Type     | Default value | Description        |
| :---------- | :------- | :------------ | :----------------- |
| `role`      | `string` | `undefined`   | user role          |
| `resource`  | `string` | `'*'`         | resource to access |
| `operation` | `string` | `'*'`         | operation          |

#### Returns

`void`

#### Defined in

[index.ts:116](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L116)
