**[fast-rbac](../README.md)**

[Globals]() › [RBAC](../README.md) › [Options](rbac.options.md)

# Interface: Options

RBAC options.

## Hierarchy

* **Options**

## Index

### Properties

* [memoize](rbac.options.md#optional-memoize)
* [roles](rbac.options.md#optional-roles)

## Properties

### `Optional` memoize

• **memoize**? : *undefined | false | true*

Defined in index.ts:325

If true makes wildcard matches faster.

**`default`** true

___

### `Optional` roles

• **roles**? : *undefined | object*

Defined in index.ts:315

List of roles and their permissions.

**`type`** Object<string, [RBAC.RulesObject](rbac.rulesobject.md)>

**`see`** [RBAC.RulesObject](rbac.rulesobject.md)