[Fast RBAC - v1.3.0](../README.md) / [Modules](../modules.md) / [index](index.md) / RBAC

# Namespace: RBAC

[index](index.md).RBAC

## Table of contents

### Interfaces

- [OperationRules](../interfaces/index.rbac.operationrules.md)
- [Options](../interfaces/index.rbac.options.md)
- [Refs](../interfaces/index.rbac.refs.md)
- [ResourcePermission](../interfaces/index.rbac.resourcepermission.md)
- [ResourceRules](../interfaces/index.rbac.resourcerules.md)
- [RoleRules](../interfaces/index.rbac.rolerules.md)
- [RulesObject](../interfaces/index.rbac.rulesobject.md)

### Type aliases

- [WhenFn](index.rbac.md#whenfn)

## Type aliases

### WhenFn

Ƭ **WhenFn**<TContext\>: (`context`: `TContext`) => `boolean` \| `Promise`<boolean\>

#### Type parameters

| Name       | Type               |
| :--------- | :----------------- |
| `TContext` | `TContext` = `any` |

#### Type declaration

▸ (`context`): `boolean` \| `Promise`<boolean\>

Dynamic condition check function.

##### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `context` | `TContext` |

##### Returns

`boolean` \| `Promise`<boolean\>

#### Defined in

[index.ts:216](https://github.com/SkeLLLa/fast-rbac/blob/e7b061f/src/index.ts#L216)
