[Fast RBAC - v1.3.0](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / [RBAC](../modules/index.rbac.md) / RulesObject

# Interface: RulesObject

[index](../modules/index.md).[RBAC](../modules/index.rbac.md).RulesObject

List of RBAC rules and inherited roles.

## Table of contents

### Properties

- [can](index.rbac.rulesobject.md#can)
- [inherits](index.rbac.rulesobject.md#inherits)

## Properties

### can

• **can**: (`string` \| [ResourcePermission](index.rbac.resourcepermission.md))[]

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

**`see`** [RBAC.ResourcePermission](index.rbac.resourcepermission.md)

#### Defined in

[index.ts:302](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L302)

---

### inherits

• `Optional` **inherits**: `string`[]

Optionally extend permissions from other roles.

#### Defined in

[index.ts:306](https://github.com/SkeLLLa/fast-rbac/blob/e543d2b/src/index.ts#L306)
