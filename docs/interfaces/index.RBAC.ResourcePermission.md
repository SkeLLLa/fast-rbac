[Fast RBAC - v2.0.0](../README.md) / [index](../modules/index.md) / [RBAC](../modules/index.RBAC.md) / ResourcePermission

# Interface: ResourcePermission

[index](../modules/index.md).[RBAC](../modules/index.RBAC.md).ResourcePermission

Resoure permission.

## Table of contents

### Properties

- [name](index.RBAC.ResourcePermission.md#name)
- [operation](index.RBAC.ResourcePermission.md#operation)
- [when](index.RBAC.ResourcePermission.md#when)

## Properties

### name

• **name**: `string`

Resourece name or resource with operation.

**`example`** "foo"

**`example`** "foo:read"

#### Defined in

[index.ts:272](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L272)

---

### operation

• `Optional` **operation**: `string`

Operation name.

**`example`** "read"

#### Defined in

[index.ts:277](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L277)

---

### when

• `Optional` **when**: [`WhenFn`](../modules/index.RBAC.md#whenfn)<`any`\>

Dynamic condition check function.

**`see`** [RBAC.WhenFn](../modules/index.RBAC.md#whenfn)

#### Defined in

[index.ts:282](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L282)
