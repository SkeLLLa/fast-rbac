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
    console.log(rbac['_rules']);
    console.log(rbac['_rulesCompiled']);
    test('extend:overrrides', async () => {
      await expect(rbac.can('user', 'foo', 'read', {})).resolves.toEqual(false);
      await expect(rbac.can('admin', 'foo', 'read', {})).resolves.toEqual(true);
      await expect(rbac.can('superadmin', 'foo', 'read', {})).resolves.toEqual(
        true
      );
    });
  });
});
