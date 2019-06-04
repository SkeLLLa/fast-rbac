import {flatten, mergeRoles} from './utils';

const SEPARATOR = ':';

/**
 * RBAC classref
 */
export class RBAC {
  /**
   * RBAC roles object
   */
  private _rules: RBAC.RoleRules = {};
  private _rulesCompiled: {[rule: string]: boolean | RBAC.WhenFn} = {};
  private _refs: RBAC.Refs = {};
  private _memoize: boolean = true;

  private _collectRefs(refs?: RBAC.RoleRules) {
    if (typeof refs === 'undefined') {
      return {};
    }

    const refsToCompile: RBAC.ResourceRules = {};
    for (const refRole of Object.keys(refs)) {
      mergeRoles(
        refsToCompile,
        this._collectRefs(this._refs[refRole]),
        refs[refRole]
      );
    }
    return refsToCompile;
  }

  private _compile() {
    const refsToCompile: RBAC.RoleRules = {};
    for (const [role, ref] of Object.entries(this._refs)) {
      refsToCompile[role] = refsToCompile[role] || {};
      refsToCompile[role] = this._collectRefs(ref);
    }

    this._rulesCompiled = {
      ...flatten(refsToCompile, SEPARATOR),
      ...flatten(this._rules, SEPARATOR),
    };
  }

  /**
   * RBAC constructor
   * @param options RBAC options
   */
  constructor(options: RBAC.Options = {}) {
    const {roles = {}, memoize = true} = options;
    this._memoize = memoize;

    for (const [roleName, permissions] of Object.entries(roles)) {
      if (permissions.can.length !== 0) {
        this._rules[roleName] = this._rules[roleName] || {};
        const resRule = this._rules[roleName];
        for (const permission of permissions.can) {
          if (typeof permission === 'string') {
            const [resource, operation = '*'] = permission.split(SEPARATOR);
            resRule[resource] = resRule[resource] || {};
            const opRule = resRule[resource];
            opRule[operation] = true;
          } else {
            const [resource, operation] = permission.operation
              ? [permission.name, permission.operation]
              : permission.name.split(SEPARATOR);
            resRule[resource] = resRule[resource] || {};
            const opRule = resRule[resource];
            opRule[operation] =
              typeof permission.when !== 'undefined' ? permission.when : true;
          }
        }
      }
      if (permissions.inherits) {
        for (const refRole of permissions.inherits) {
          this._refs[roleName] = this._refs[roleName] || {};
          // this._rules[refRole] = this._rules[refRole] || {};
          this._refs[roleName][refRole] = this._rules[refRole];
        }
      }
    }
    this._compile();
  }

  /**
   * Adds new role to rules.
   * @public
   * @version 1.1.X
   * @param role user role
   * @param resource resource to access
   * @param operation allowed operation
   * @param when function for additional checks
   */
  public add(
    role: string,
    resource: string,
    operation: string,
    when?: RBAC.WhenFn
  ): void {
    this._rules[role] = this._rules[role] || {};
    this._rules[role][resource] = this._rules[role][resource] || {};
    this._rules[role][resource][operation] =
      typeof when === 'undefined' ? true : when;
    this._compile();
  }

  /**
   * Remove rule(s).
   * @public
   * @version 1.1.X
   * @param role user role
   * @param resource resource to access
   * @param operation operation
   */
  public remove(role: string, resource = '*', operation = '*'): void {
    if (resource === '*') {
      if (operation === '*') {
        // role:*:*
        delete this._rules[role];
      } else {
        // role:*:operation
        if (this._rules[role][resource]) {
          delete this._rules[role][resource][operation];
        }
        for (const [res, opRule] of Object.entries(this._rules[role])) {
          if (Object.keys(opRule).indexOf(operation) !== -1) {
            delete this._rules[role][res][operation];
          }
        }
      }
    } else {
      if (operation === '*') {
        // role:resource:*
        delete this._rules[role][resource];
      } else {
        // role:resource:operation
        delete this._rules[role][resource][operation];
      }
    }
    this._compile();
  }

  /**
   * Checks if user can perform operation without checking when condition.
   * @public
   * @version 1.X.X
   * @param role user role
   * @param resource resource to access
   * @param operation operation on resource
   * @returns true if role has access to resources
   */
  public can(role: string, resource: string, operation?: string): boolean;

  /**
   * Checks if user can perform operation with checking when condition if it's provided.
   * @public
   * @version 1.X.X
   * @param role user role
   * @param resource resource to access
   * @param operation operation on resource
   * @param context context passed to when function, set it to null
   * @returns true if role has access to resources.
   */
  public can(
    role: string,
    resource: string,
    operation: string,
    context: any
  ): Promise<boolean>;

  public can(
    role: string,
    resource: string,
    operation: string,
    context?: any
  ): boolean | Promise<boolean> {
    let check: boolean | RBAC.WhenFn = false;
    const checkWhen = typeof context !== 'undefined';
    const rule = [role, resource, operation].join(SEPARATOR);
    if (this._rulesCompiled.hasOwnProperty(rule)) {
      check = this._rulesCompiled[rule];
    } else {
      const wildcardRules = [
        [role, resource, '*'].join(SEPARATOR),
        [role, '*', operation].join(SEPARATOR),
        [role, '*', '*'].join(SEPARATOR),
      ];
      for (const wcr of wildcardRules) {
        if (this._rulesCompiled.hasOwnProperty(wcr)) {
          check = this._rulesCompiled[wcr];
          if (this._memoize) {
            // add to rules
            this._rulesCompiled[rule] = this._rulesCompiled[wcr];
            this._rules[role][resource] = this._rules[role][resource] || {};
            this._rules[role][resource][operation] = check;
          }
        }
      }
    }

    if (typeof check === 'boolean') {
      return check;
    }
    if (checkWhen) {
      return check(context);
    }
    return Boolean(check);
  }
}

export namespace RBAC {
  /**
   * Dynamic condition check function.
   */
  export type WhenFn = (context: any) => boolean | Promise<boolean>;
  /**
   * Interherence references.
   * @see {@link RBAC.RoleRules}
   */
  export interface Refs {
    /**
     * Role rules.
     * {@link (RBAC:namespace).RoleRules}
     */
    [roleName: string]: RoleRules;
  }
  /**
   * Operation permission list.
   */
  export interface OperationRules {
    /**
     * Operation permission.
     * @description `true` if allowed or `function` if need additional dynamic checks
     * @see {@link RBAC.WhenFn}
     */
    [operationName: string]: boolean | WhenFn;
  }
  /**
   * Resource operations list.
   * @type Object<string, {@link RBAC.OperationRules}>
   * @see {@link RBAC.OperationRules}
   */
  export interface ResourceRules {
    /**
     * Resoure operation.
     */
    [resourceName: string]: OperationRules;
  }
  /**
   * Role's resources list.
   * @type Object<string, {@link RBAC.ResourceRules}>
   * @see {@link RBAC.ResourceRules}
   */
  export interface RoleRules {
    /**
     * Resource permissions list.
     */
    [roleName: string]: ResourceRules;
  }
  /**
   * Resoure permission.
   */
  export interface ResourcePermission {
    /**
     * Resourece name or resource with operation.
     * @example "foo"
     * @example "foo:read"
     */
    name: string;
    /**
     * Operation name.
     * @example "read"
     */
    operation?: string;
    /**
     * Dynamic condition check function.
     * @see {@link RBAC.WhenFn}
     */
    when?: WhenFn;
  }
  /**
   * List of RBAC rules and inherited roles.
   */
  export interface RulesObject {
    /**
     * List of resource and permissions.
     * @example
     * can: ["foo:create", "bar:*", "*:read"]
     * can: ["*"]
     * can: [{
     *   name: "baz",
     *   operation: "create",
     *   when: (ctx) => {
     *     return ctx.user.id === ctx.obj.creatorId
     *   }
     * }]
     * @see {@link RBAC.ResourcePermission}
     */
    can: Array<string | ResourcePermission>;
    /**
     * Optionally extend permissions from other roles.
     */
    inherits?: Array<string>;
  }
  /**
   * RBAC options.
   */
  export interface Options {
    /**
     * List of roles and their permissions.
     * @type Object<string, {@link RBAC.RulesObject}>
     * @see {@link RBAC.RulesObject}
     */
    roles?: {
      /**
       * Role and it's permissions.
       */
      [roleName: string]: RBAC.RulesObject;
    };
    /**
     * If true makes wildcard matches faster.
     * @default true
     */
    memoize?: boolean;
  }
}

export default RBAC;
