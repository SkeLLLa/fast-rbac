[fast-rbac](../README.md) › [RBAC](../classes/rbac.md) › [OperationRules](rbac.operationrules.md)

# Interface: OperationRules

Operation permission list.

## Hierarchy

* **OperationRules**

## Indexable

* \[ **operationName**: *string*\]: boolean | [WhenFn](../classes/rbac.md#static-whenfn)

Operation permission.

**`description`** `true` if allowed or `function` if need additional dynamic checks

**`see`** [RBAC.WhenFn](../classes/rbac.md#static-whenfn)
