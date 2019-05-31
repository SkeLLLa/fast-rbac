[fast-rbac](../README.md) > [Options](../interfaces/rbac.options.md)

# Interface: Options

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

*Defined in index.ts:219*

If true makes wildcard matches faster

*__default__*: true

___
<a id="roles"></a>

###  roles

**● roles**: *`object`*

*Defined in index.ts:212*

Initial roles with permissions.

#### Type declaration

[roleName: `string`]: [RulesObject](rbac.rulesobject.md)

___

