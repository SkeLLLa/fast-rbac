[Fast RBAC - v2.0.0](../README.md) / [index](../modules/index.md) / [RBAC](../modules/index.RBAC.md) / RulesObject

# Interface: RulesObject

[index](../modules/index.md).[RBAC](../modules/index.RBAC.md).RulesObject

List of RBAC rules and inherited roles.

## Table of contents

### Properties

- [can](index.RBAC.RulesObject.md#can)
- [inherits](index.RBAC.RulesObject.md#inherits)

## Properties

### can

• **can**: (`string` \| [`ResourcePermission`](index.RBAC.ResourcePermission.md))[]

List of resource and permissions.

**`example`**
can: ["foo:create", "bar:*", "*:read"]
can: ["*"]
can: [{
name: "baz",
operation: "create",
when: (ctx) => {
return ctx.user.id === ctx.obj.creatorId
}
}]

**`see`** [RBAC.ResourcePermission](index.RBAC.ResourcePermission.md)

#### Defined in

[index.ts:302](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L302)

---

### inherits

• `Optional` **inherits**: `string`[]

Optionally extend permissions from other roles.

#### Defined in

[index.ts:306](https://github.com/SkeLLLa/fast-rbac/blob/5bc3a55/src/index.ts#L306)
