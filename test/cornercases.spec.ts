// tslint:disable: no-string-literal

import 'jest';
import RBAC from '../src/index';

describe('rbac', () => {
  describe('hierarchical', () => {
    const rbac = new RBAC({
      roles: {
        user: {
          can: [
            {
              name: 'foo',
              operation: 'read',
              when: () => {
                return false;
              },
            },
          ],
        },
        admin: {
          can: [
            {
              name: 'foo',
              operation: 'read',
            },
          ],
          inherits: ['user'],
        },
        superadmin: {
          can: [],
          inherits: ['admin'],
        },
      },
    });
    console.log(rbac['_rules']);
    console.log(rbac['_rulesCompiled']);
    test('extend:overrrides', () => {
      expect(rbac.can('user', 'foo', 'read', {})).toEqual(false);
      expect(rbac.can('admin', 'foo', 'read', {})).toEqual(true);
      expect(rbac.can('superadmin', 'foo', 'read', {})).toEqual(true);
    });
  });
});
