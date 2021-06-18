import { describe, test, expect } from '@jest/globals';
import RBAC from '../src/index';

describe('rbac', () => {
  describe('can', () => {
    const basic = new RBAC({
      roles: {
        guest: {
          can: ['foo:read'],
        },
        user: {
          can: [
            {
              name: 'foo:update',
            },
          ],
        },
        admin: {
          can: [
            {
              name: 'foo',
              operation: 'remove',
            },
          ],
        },
        superadmin: {
          can: [
            {
              name: 'foo',
              operation: 'create',
              when: (ctx: { userId: string; ownerId: string }) => {
                return Promise.resolve(ctx.userId === ctx.ownerId);
              },
            },
          ],
        },
      },
    });

    const wildcard = new RBAC({
      roles: {
        guest: {
          can: ['*:read'],
        },
        user: {
          can: ['foo:*'],
        },
        admin: {
          can: ['*'],
        },
      },
    });

    const wildcardNoMemo = new RBAC({
      roles: {
        user: {
          can: ['foo:*'],
        },
      },
      memoize: false,
    });

    const hierarchical = new RBAC({
      roles: {
        guest: {
          can: ['foo:read'],
        },
        anon: {
          can: [],
          inherits: ['guest'],
        },
        user: {
          can: [
            {
              name: 'foo:update',
            },
          ],
          inherits: ['guest'],
        },
        admin: {
          can: [
            {
              name: 'foo',
              operation: 'remove',
            },
          ],
          inherits: ['user'],
        },
        superadmin: {
          can: [
            {
              name: 'foo',
              operation: 'create',
              when: (ctx: { userId: string; ownerId: string }) => {
                return Promise.resolve(ctx.userId === ctx.ownerId);
              },
            },
          ],
          inherits: ['admin'],
        },
      },
    });

    describe('basic', () => {
      test('nonexist:can:false', () => {
        expect(basic.can('somebody', 'foo', 'read')).toEqual(false);
        expect(basic['_rulesCompiled']['somebody:foo:read']).toBeUndefined();
      });
      test('can:true', () => {
        expect(basic.can('guest', 'foo', 'read')).toEqual(true);
        expect(basic['_rulesCompiled']['guest:foo:read']).toEqual(true);
      });
      test('can:false', () => {
        expect(basic.can('guest', 'foo', 'update')).toEqual(false);
        expect(basic['_rulesCompiled']['guest:foo:update']).toBeUndefined();
      });
      test('can:true', () => {
        expect(basic.can('user', 'foo', 'update')).toEqual(true);
        expect(basic['_rulesCompiled']['user:foo:update']).toEqual(true);
      });
      test('can:false', () => {
        expect(basic.can('user', 'foo', 'remove')).toEqual(false);
        expect(basic['_rulesCompiled']['user:foo:remove']).toBeUndefined();
      });
      test('can:true', () => {
        expect(basic.can('admin', 'foo', 'remove')).toEqual(true);
        expect(basic['_rulesCompiled']['admin:foo:remove']).toEqual(true);
      });
      test('can:false', () => {
        expect(basic.can('admin', 'foo', 'create')).toEqual(false);
        expect(basic['_rulesCompiled']['admin:foo:create']).toBeUndefined();
      });
      test('can:nowhen:true', () => {
        expect(basic.can('superadmin', 'foo', 'create')).toEqual(true);
        expect(basic['_rulesCompiled']['superadmin:foo:create']).toBeDefined();
      });
      test('can:nowhen:false', () => {
        expect(basic.can('superadmin', 'foo', 'read')).toEqual(false);
        expect(basic['_rulesCompiled']['superadmin:foo:read']).toBeUndefined();
      });
      test('can:when:true', async () => {
        await expect(
          basic.can('superadmin', 'foo', 'create', { userId: 1, ownerId: 1 })
        ).resolves.toEqual(true);
        expect(basic['_rulesCompiled']['superadmin:foo:create']).toBeDefined();
      });
      test('can:when:false', async () => {
        await expect(
          basic.can('superadmin', 'foo', 'create', { userId: 1, ownerId: 2 })
        ).resolves.toEqual(false);
        expect(basic['_rulesCompiled']['superadmin:foo:create']).toBeDefined();
      });
    });
    describe('wildcard', () => {
      test('can:true', () => {
        expect(wildcard.can('guest', 'foo', 'read')).toEqual(true);
        expect(wildcard['_rulesCompiled']['guest:foo:read']).toEqual(true);
      });
      test('can:false', () => {
        expect(wildcard.can('guest', 'foo', 'update')).toEqual(false);
        expect(wildcard['_rulesCompiled']['guest:foo:update']).toBeUndefined();
      });
      test('can:true', () => {
        expect(wildcard.can('user', 'foo', 'read')).toEqual(true);
        expect(wildcard['_rulesCompiled']['user:foo:read']).toEqual(true);
      });
      test('can:false', () => {
        expect(wildcard.can('user', 'bar', 'update')).toEqual(false);
        expect(wildcard['_rulesCompiled']['user:bar:update']).toBeUndefined();
      });
      test('can:true', () => {
        expect(wildcard.can('admin', 'foo', 'read')).toEqual(true);
        expect(wildcard['_rulesCompiled']['admin:foo:read']).toEqual(true);
      });
      test('can:noMemo:true', () => {
        expect(wildcardNoMemo.can('user', 'foo', 'read')).toEqual(true);
        expect(
          wildcardNoMemo['_rulesCompiled']['user:foo:read']
        ).toBeUndefined();
      });
    });
    describe('hierarchical', () => {
      test('can:nonexist:false', () => {
        expect(hierarchical.can('somebody', 'foo', 'read')).toEqual(false);
        expect(
          hierarchical['_rulesCompiled']['somebody:foo:read']
        ).toBeUndefined();
      });
      test('can:true', () => {
        expect(hierarchical.can('guest', 'foo', 'read')).toEqual(true);
        expect(hierarchical['_rulesCompiled']['guest:foo:read']).toEqual(true);
      });
      test('can:false', () => {
        expect(hierarchical.can('guest', 'foo', 'update')).toEqual(false);
        expect(
          hierarchical['_rulesCompiled']['guest:foo:update']
        ).toBeUndefined();
      });
      test('can:true', () => {
        expect(hierarchical.can('anon', 'foo', 'read')).toEqual(true);
        expect(hierarchical['_rulesCompiled']['anon:foo:read']).toEqual(true);
      });
      test('can:false', () => {
        expect(hierarchical.can('anon', 'foo', 'update')).toEqual(false);
        expect(
          hierarchical['_rulesCompiled']['anon:foo:update']
        ).toBeUndefined();
      });
      test('can:true', () => {
        expect(hierarchical.can('user', 'foo', 'update')).toEqual(true);
        expect(hierarchical.can('user', 'foo', 'read')).toEqual(true);
        expect(hierarchical['_rulesCompiled']['user:foo:update']).toEqual(true);
        expect(hierarchical['_rulesCompiled']['user:foo:read']).toEqual(true);
      });
      test('can:false', () => {
        expect(hierarchical.can('user', 'foo', 'remove')).toEqual(false);
        expect(
          hierarchical['_rulesCompiled']['user:foo:remove']
        ).toBeUndefined();
      });
      test('can:true', () => {
        expect(hierarchical.can('admin', 'foo', 'remove')).toEqual(true);
        expect(hierarchical.can('admin', 'foo', 'read')).toEqual(true);
        expect(hierarchical.can('admin', 'foo', 'update')).toEqual(true);
        expect(hierarchical['_rulesCompiled']['admin:foo:remove']).toEqual(
          true
        );
        expect(hierarchical['_rulesCompiled']['admin:foo:read']).toEqual(true);
        expect(hierarchical['_rulesCompiled']['admin:foo:update']).toEqual(
          true
        );
      });
      test('can:false', () => {
        expect(hierarchical.can('admin', 'foo', 'create')).toEqual(false);
        expect(
          hierarchical['_rulesCompiled']['admin:foo:create']
        ).toBeUndefined();
      });
      test('can:nowhen:true', () => {
        expect(hierarchical.can('superadmin', 'foo', 'create')).toEqual(true);
        expect(hierarchical.can('superadmin', 'foo', 'remove')).toEqual(true);
        expect(hierarchical.can('superadmin', 'foo', 'update')).toEqual(true);
        expect(hierarchical.can('superadmin', 'foo', 'read')).toEqual(true);
        expect(
          hierarchical['_rulesCompiled']['superadmin:foo:create']
        ).toBeDefined();
        expect(
          hierarchical['_rulesCompiled']['superadmin:foo:remove']
        ).toBeDefined();
        expect(
          hierarchical['_rulesCompiled']['superadmin:foo:update']
        ).toBeDefined();
        expect(
          hierarchical['_rulesCompiled']['superadmin:foo:read']
        ).toBeDefined();
      });
      test('can:nowhen:false', () => {
        expect(hierarchical.can('superadmin', 'foo', 'restricted')).toEqual(
          false
        );
        expect(
          hierarchical['_rulesCompiled']['superadmin:foo:restricted']
        ).toBeUndefined();
      });
      test('can:when:true', async () => {
        await expect(
          hierarchical.can('superadmin', 'foo', 'create', {
            userId: 1,
            ownerId: 1,
          })
        ).resolves.toEqual(true);
        expect(
          hierarchical['_rulesCompiled']['superadmin:foo:create']
        ).toBeDefined();
      });
      test('can:when:false', async () => {
        await expect(
          hierarchical.can('superadmin', 'foo', 'create', {
            userId: 1,
            ownerId: 2,
          })
        ).resolves.toEqual(false);
        expect(
          hierarchical['_rulesCompiled']['superadmin:foo:create']
        ).toBeDefined();
      });
    });
  });

  describe('add', () => {
    test('basic:can:true', () => {
      const rbac = new RBAC();
      rbac.add('guest', 'foo', 'read');
      expect(rbac.can('guest', 'foo', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toEqual(true);
    });
    test('wildcard:can:true', () => {
      const rbac = new RBAC();
      rbac.add('guest', 'foo', '*');
      expect(rbac.can('guest', 'foo', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toEqual(true);
    });
    test('wildcard:can:true', () => {
      const rbac = new RBAC();
      rbac.add('guest', '*', 'read');
      expect(rbac.can('guest', 'foo', 'read')).toEqual(true);
      expect(rbac.can('guest', 'bar', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:bar:read']).toEqual(true);
    });
    test('hierarchical:can:true', () => {
      const rbac = new RBAC({
        roles: {
          guest: {
            can: ['foo:read'],
          },
          user: {
            can: ['foo:update'],
            inherits: ['guest'],
          },
          admin: {
            can: ['foo:remove'],
            inherits: ['user'],
          },
        },
      });
      rbac.add('guest', 'foo', 'remove');
      rbac.add('user', 'foo', 'create', (ctx: { a: number; b: number }) => {
        return ctx.a === ctx.b;
      });

      expect(rbac.can('guest', 'foo', 'remove')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:remove']).toEqual(true);
      expect(rbac.can('user', 'foo', 'remove')).toEqual(true);
      expect(rbac['_rulesCompiled']['user:foo:remove']).toEqual(true);
      expect(rbac.can('admin', 'foo', 'create')).toEqual(true);
      expect(rbac['_rulesCompiled']['admin:foo:create']).toBeDefined();
      void expect(rbac.can('admin', 'foo', 'create', { a: 1, b: 1 })).toEqual(
        true
      );
      void expect(rbac.can('admin', 'foo', 'create', { a: 1, b: 2 })).toEqual(
        false
      );
    });
  });
  describe('remove', () => {
    test('basic:can:false', () => {
      const rbac = new RBAC({
        roles: {
          guest: {
            can: ['foo:read'],
          },
        },
      });
      expect(rbac.can('guest', 'foo', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toEqual(true);
      rbac.remove('guest', 'foo', 'read');
      expect(rbac.can('guest', 'foo', 'read')).toEqual(false);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toBeUndefined();
    });
    test('wildcard:can:false', () => {
      const rbac = new RBAC({
        roles: {
          guest: {
            can: ['foo:read'],
          },
        },
      });
      expect(rbac.can('guest', 'foo', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toEqual(true);
      rbac.remove('guest', 'foo');
      expect(rbac.can('guest', 'foo', 'read')).toEqual(false);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toBeUndefined();
    });
    test('wldcard:can:false', () => {
      const rbac = new RBAC({
        roles: {
          guest: {
            can: ['foo:read'],
          },
        },
      });
      expect(rbac.can('guest', 'foo', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toEqual(true);
      rbac.remove('guest');
      expect(rbac.can('guest', 'foo', 'read')).toEqual(false);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toBeUndefined();
    });
    test('wldcard:can:false', () => {
      const rbac = new RBAC({
        roles: {
          guest: {
            can: ['foo:read'],
          },
        },
      });
      expect(rbac.can('guest', 'foo', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toEqual(true);
      rbac.remove('guest', '*', 'read');
      expect(rbac.can('guest', 'foo', 'read')).toEqual(false);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toBeUndefined();
    });
    test('wldcard:can:false', () => {
      const rbac = new RBAC({
        roles: {
          guest: {
            can: ['*:read'],
          },
        },
      });
      expect(rbac.can('guest', 'foo', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toEqual(true);
      rbac.remove('guest', '*', 'read');
      expect(rbac.can('guest', 'foo', 'read')).toEqual(false);
      expect(rbac['_rulesCompiled']['guest:foo:read']).toBeUndefined();
    });
    test('hierarchical:can:false', () => {
      const rbac = new RBAC({
        roles: {
          guest: {
            can: ['foo:read'],
          },
          user: {
            can: ['foo:update'],
            inherits: ['guest'],
          },
        },
      });
      expect(rbac.can('user', 'foo', 'read')).toEqual(true);
      expect(rbac['_rulesCompiled']['user:foo:read']).toEqual(true);
      rbac.remove('guest', 'foo', 'read');
      expect(rbac.can('user', 'foo', 'read')).toEqual(false);
      expect(rbac['_rulesCompiled']['user:foo:read']).toBeUndefined();
    });
  });
});
