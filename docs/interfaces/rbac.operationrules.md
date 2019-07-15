> **[fast-rbac](../README.md)**

[RBAC](../README.md) / [OperationRules](rbac.operationrules.md) /

# Interface: OperationRules

Operation permission list.

## Hierarchy

* **OperationRules**

## Indexable

● \[▪ **operationName**: *string*\]: boolean | [WhenFn](../README.md#static-whenfn)

Operation permission.

**`description`** `true` if allowed or `function` if need additional dynamic checks

**`see`** [RBAC.WhenFn](../README.md#static-whenfn)