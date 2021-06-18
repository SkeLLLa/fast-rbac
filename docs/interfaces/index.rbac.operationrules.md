[Fast RBAC - v1.3.0](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / [RBAC](../modules/index.rbac.md) / OperationRules

# Interface: OperationRules

[index](../modules/index.md).[RBAC](../modules/index.rbac.md).OperationRules

Operation permission list.

## Indexable

▪ [operationName: `string`]: `boolean` \| [WhenFn](../modules/index.rbac.md#whenfn)

Operation permission.

**`description`** `true` if allowed or `function` if need additional dynamic checks

**`see`** [RBAC.WhenFn](../modules/index.rbac.md#whenfn)
