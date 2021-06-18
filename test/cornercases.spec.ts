import { describe, test, expect } from '@jest/globals';
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
    test('extend:overrrides', () => {
      void expect(rbac.can('user', 'foo', 'read', {})).toEqual(false);
      void expect(rbac.can('admin', 'foo', 'read', {})).toEqual(true);
      void expect(rbac.can('superadmin', 'foo', 'read', {})).toEqual(true);
    });
  });
});
