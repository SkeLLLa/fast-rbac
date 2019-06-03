[fast-rbac](../README.md) > [RulesObject](../interfaces/rbac.rulesobject.md)

# Interface: RulesObject

List of RBAC rules and inherited roles.

## Hierarchy

**RulesObject**

## Index

### Properties

* [can](rbac.rulesobject.md#can)
* [inherits](rbac.rulesobject.md#inherits)

---

## Properties

<a id="can"></a>

###  can

**● can**: *`Array`<`string` \| [ResourcePermission](rbac.resourcepermission.md)>*

*Defined in index.ts:298*

List of resource and permissions.

*__example__*: can: \["foo:create", "bar:_", "_:read"\] can: \["\*"\] can: \[{ name: "baz", operation: "create", when: (ctx) => { return ctx.user.id === ctx.obj.creatorId } }\]

*__see__*: [RBAC.ResourcePermission](rbac.resourcepermission.md)

___
<a id="inherits"></a>

### `<Optional>` inherits

**● inherits**: *`Array`<`string`>*

*Defined in index.ts:302*

Optionally extend permissions from other roles.

___

