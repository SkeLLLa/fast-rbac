[fast-rbac](../README.md) > [ResourcePermission](../interfaces/rbac.resourcepermission.md)

# Interface: ResourcePermission

Resoure permission.

## Hierarchy

**ResourcePermission**

## Index

### Properties

* [name](rbac.resourcepermission.md#name)
* [operation](rbac.resourcepermission.md#operation)
* [when](rbac.resourcepermission.md#when)

---

## Properties

<a id="name"></a>

###  name

**● name**: *`string`*

*Defined in index.ts:268*

Resourece name or resource with operation.

*__example__*: "foo"

*__example__*: "foo:read"

___
<a id="operation"></a>

### `<Optional>` operation

**● operation**: *`undefined` \| `string`*

*Defined in index.ts:273*

Operation name.

*__example__*: "read"

___
<a id="when"></a>

### `<Optional>` when

**● when**: *[WhenFn](../#whenfn)*

*Defined in index.ts:278*

Dynamic condition check function.

*__see__*: [RBAC.WhenFn](../#whenfn)

___

