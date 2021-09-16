[Fast RBAC - v2.0.0](../README.md) / [index](../modules/index.md) / [RBAC](../modules/index.RBAC.md) / OperationRules

# Interface: OperationRules

[index](../modules/index.md).[RBAC](../modules/index.RBAC.md).OperationRules

Operation permission list.

## Indexable

▪ [operationName: `string`]: `boolean` \| [`WhenFn`](../modules/index.RBAC.md#whenfn)

Operation permission.

**`description`** `true` if allowed or `function` if need additional dynamic checks

**`see`** [RBAC.WhenFn](../modules/index.RBAC.md#whenfn)
