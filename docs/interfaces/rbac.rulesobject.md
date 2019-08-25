**[fast-rbac](../README.md)**

[Globals]() › [RBAC](../README.md) › [RulesObject](rbac.rulesobject.md)

# Interface: RulesObject

List of RBAC rules and inherited roles.

## Hierarchy

* **RulesObject**

## Index

### Properties

* [can](rbac.rulesobject.md#can)
* [inherits](rbac.rulesobject.md#optional-inherits)

## Properties

###  can

• **can**: *Array‹string | [ResourcePermission](rbac.resourcepermission.md)›*

Defined in index.ts:300

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

**`see`** [RBAC.ResourcePermission](rbac.resourcepermission.md)

___

### `Optional` inherits

• **inherits**? : *Array‹string›*

Defined in index.ts:304

Optionally extend permissions from other roles.