[Fast RBAC - v2.0.0](../README.md) / [index](index.md) / RBAC

# Namespace: RBAC

[index](index.md).RBAC

## Table of contents

### Interfaces

- [OperationRules](../interfaces/index.RBAC.OperationRules.md)
- [Options](../interfaces/index.RBAC.Options.md)
- [Refs](../interfaces/index.RBAC.Refs.md)
- [ResourcePermission](../interfaces/index.RBAC.ResourcePermission.md)
- [ResourceRules](../interfaces/index.RBAC.ResourceRules.md)
- [RoleRules](../interfaces/index.RBAC.RoleRules.md)
- [RulesObject](../interfaces/index.RBAC.RulesObject.md)

### Type aliases

- [WhenFn](index.RBAC.md#whenfn)

## Type aliases

### WhenFn

Ƭ **WhenFn**<`TContext`\>: (`context`: `TContext`) => `boolean` \| `Promise`<`boolean`\>

#### Type parameters

| Name       | Type  |
| :--------- | :---- |
| `TContext` | `any` |

#### Type declaration

▸ (`context`): `boolean` \| `Promise`<`boolean`\>

Dynamic condition check function.

##### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `context` | `TContext` |

##### Returns

`boolean` \| `Promise`<`boolean`\>

#### Defined in

[index.ts:216](https://github.com/SkeLLLa/fast-rbac/blob/ef47d80/src/index.ts#L216)
