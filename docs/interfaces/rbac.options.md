[fast-rbac](../README.md) > [Options](../interfaces/rbac.options.md)

# Interface: Options

RBAC options.

## Hierarchy

**Options**

## Index

### Properties

* [memoize](rbac.options.md#memoize)
* [roles](rbac.options.md#roles)

---

## Properties

<a id="memoize"></a>

### `<Optional>` memoize

**● memoize**: *`undefined` \| `false` \| `true`*

*Defined in index.ts:325*

If true makes wildcard matches faster.

*__default__*: true

___
<a id="roles"></a>

### `<Optional>` roles

**● roles**: *`undefined` \| `object`*

*Defined in index.ts:315*

List of roles and their permissions.

*__type__*: Object<string, [RBAC.RulesObject](rbac.rulesobject.md)\>

*__see__*: [RBAC.RulesObject](rbac.rulesobject.md)

___

