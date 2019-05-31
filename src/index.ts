import {flatten, mergeRoles} from './utils';

const SEPARATOR = ':';

/**
 * RBAC classref
 */
class RBAC {
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
        refs[refRole],
        this._collectRefs(this._refs[refRole])
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

    this._rulesCompiled = Object.assign(
      {},
      flatten(refsToCompile, SEPARATOR),
      flatten(this._rules, SEPARATOR)
    );
  }

  /**
   * RBAC constructor
   */
  constructor(options: RBAC.Options) {
    const {roles, memoize = true} = options;
    this._memoize = memoize;

    for (const [roleName, permissions] of Object.entries(roles)) {
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
      if (permissions.inherits) {
        for (const refRole of permissions.inherits) {
          this._refs[roleName] = this._refs[roleName] || {};
          this._rules[refRole] = this._rules[refRole] || {};
          this._refs[roleName][refRole] = this._rules[refRole];
        }
      }
    }
    this._compile();
  }

  /**
   * Adds new role to rules
   * @param role user role
   * @param resource resource to access
   * @param permissions permission or permission list
   * @param when function for additional checks
   */
  public add(
    _role: string,
    _resource: string,
    _permissions: Array<string> | string,
    _when?: RBAC.WhenFn
  ) {
    throw Error('Not implemented');
  }
  /**
   * Checks if user can perform operation without checking when condition
   * @param role user role
   * @param resource resource to access
   * @param permissions permission or permission list
   * @returns true if role has access to resources
   */
  can(role: string, resource: string, operation: string): boolean;

  /**
   * Checks if user can perform operation with checking when condition if it's provided
   * @param role user role
   * @param resource resource to access
   * @param permissions permission or permission list
   * @param context context passed to when function, set it to null
   * @returns true if role has access to resources
   */
  can(
    role: string,
    resource: string,
    operation: string,
    context: any
  ): Promise<boolean>;

  can(
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
    return !!check;
    // return true;
  }
}

namespace RBAC {
  export type WhenFn = (context: any) => boolean | Promise<boolean>;
  export interface Refs {
    [roleName: string]: RoleRules;
  }
  export interface OperationRules {
    [operationName: string]: boolean | WhenFn;
  }
  export interface ResourceRules {
    [resourceName: string]: OperationRules;
  }
  export interface RoleRules {
    [roleName: string]: ResourceRules;
  }
  export interface ResourcePermission {
    name: string;
    operation?: string;
    when?: WhenFn;
  }
  export interface RulesObject {
    /**
     * List of resource and permissions
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
     *
     */
    can: Array<string | ResourcePermission>;
    /**
     * Optionally extend permissions from other roles
     */
    inherits?: Array<string>;
  }
  export interface Options {
    /**
     * Initial roles with permissions
     */
    roles: {
      [roleName: string]: RBAC.RulesObject;
    };
    /**
     * If true makes wildcard matches faster
     * @default true
     */
    memoize?: boolean;
  }
}

export default RBAC;
