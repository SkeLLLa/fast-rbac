[Fast RBAC - v1.3.0](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / [RBAC](../modules/index.rbac.md) / Options

# Interface: Options

[index](../modules/index.md).[RBAC](../modules/index.rbac.md).Options

RBAC options.

## Table of contents

### Properties

- [memoize](index.rbac.options.md#memoize)
- [roles](index.rbac.options.md#roles)

## Properties

### memoize

• `Optional` **memoize**: `boolean`

If true makes wildcard matches faster.

**`default`** true

#### Defined in

[index.ts:327](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L327)

---

### roles

• `Optional` **roles**: `Object`

List of roles and their permissions.

**`see`** [RBAC.RulesObject](index.rbac.rulesobject.md)

#### Index signature

▪ [roleName: `string`]: [RulesObject](index.rbac.rulesobject.md)

Role and it's permissions.

#### Defined in

[index.ts:317](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L317)
