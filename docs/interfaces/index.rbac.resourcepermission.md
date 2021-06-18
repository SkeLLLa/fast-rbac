[Fast RBAC - v1.3.0](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / [RBAC](../modules/index.rbac.md) / ResourcePermission

# Interface: ResourcePermission

[index](../modules/index.md).[RBAC](../modules/index.rbac.md).ResourcePermission

Resoure permission.

## Table of contents

### Properties

- [name](index.rbac.resourcepermission.md#name)
- [operation](index.rbac.resourcepermission.md#operation)
- [when](index.rbac.resourcepermission.md#when)

## Properties

### name

• **name**: `string`

Resourece name or resource with operation.

**`example`** "foo"

**`example`** "foo:read"

#### Defined in

[index.ts:272](https://github.com/SkeLLLa/fast-rbac/blob/e7b061f/src/index.ts#L272)

---

### operation

• `Optional` **operation**: `string`

Operation name.

**`example`** "read"

#### Defined in

[index.ts:277](https://github.com/SkeLLLa/fast-rbac/blob/e7b061f/src/index.ts#L277)

---

### when

• `Optional` **when**: [WhenFn](../modules/index.rbac.md#whenfn)<any\>

Dynamic condition check function.

**`see`** [RBAC.WhenFn](../modules/index.rbac.md#whenfn)

#### Defined in

[index.ts:282](https://github.com/SkeLLLa/fast-rbac/blob/e7b061f/src/index.ts#L282)
