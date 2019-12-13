[fast-rbac](../README.md) › [RBAC](../classes/rbac.md) › [ResourcePermission](rbac.resourcepermission.md)

# Interface: ResourcePermission

Resoure permission.

## Hierarchy

* **ResourcePermission**

## Index

### Properties

* [name](rbac.resourcepermission.md#name)
* [operation](rbac.resourcepermission.md#optional-operation)
* [when](rbac.resourcepermission.md#optional-when)

## Properties

###  name

• **name**: *string*

Defined in index.ts:270

Resourece name or resource with operation.

**`example`** "foo"

**`example`** "foo:read"

___

### `Optional` operation

• **operation**? : *undefined | string*

Defined in index.ts:275

Operation name.

**`example`** "read"

___

### `Optional` when

• **when**? : *[WhenFn](../classes/rbac.md#static-whenfn)*

Defined in index.ts:280

Dynamic condition check function.

**`see`** [RBAC.WhenFn](../classes/rbac.md#static-whenfn)
