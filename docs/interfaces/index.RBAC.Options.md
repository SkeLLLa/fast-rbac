[Fast RBAC - v2.0.0](../README.md) / [index](../modules/index.md) / [RBAC](../modules/index.RBAC.md) / Options

# Interface: Options

[index](../modules/index.md).[RBAC](../modules/index.RBAC.md).Options

RBAC options.

## Table of contents

### Properties

- [memoize](index.RBAC.Options.md#memoize)
- [roles](index.RBAC.Options.md#roles)

## Properties

### memoize

• `Optional` **memoize**: `boolean`

If true makes wildcard matches faster.

**`default`** true

#### Defined in

[index.ts:327](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L327)

---

### roles

• `Optional` **roles**: `Object`

List of roles and their permissions.

**`see`** [RBAC.RulesObject](index.RBAC.RulesObject.md)

#### Index signature

▪ [roleName: `string`]: [`RulesObject`](index.RBAC.RulesObject.md)

Role and it's permissions.

#### Defined in

[index.ts:317](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L317)
