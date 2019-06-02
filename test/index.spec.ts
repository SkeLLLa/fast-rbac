import 'jest';
import RBAC from '../src/index';

describe('rbac', () => {
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
            when: (ctx) => {
              return ctx.userId === ctx.ownerId;
            },
          },
        ],
      },
    },
  });

  // const hierarchical = new RBAC({
  //   roles: {
  //     guest: {
  //       can: ['foo:read'],
  //     },
  //     user: {
  //       can: [
  //         {
  //           name: 'foo:update',
  //         },
  //       ],
  //       inherits: ['guest'],
  //     },
  //     admin: {
  //       can: [
  //         {
  //           name: 'foo',
  //           operation: 'remove',
  //         },
  //       ],
  //       inherits: ['user'],
  //     },
  //     superadmin: {
  //       can: [
  //         {
  //           name: 'foo',
  //           operation: 'create',
  //           when: (ctx) => {
  //             return ctx.userId === ctx.ownerId;
  //           },
  //         },
  //       ],
  //       inherits: ['admin'],
  //     },
  //   },
  // });

  describe('can', () => {
    describe('basic', () => {
      // tslint:disable: no-string-literal
      test('can:nonexist:false', () => {
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
      test('can:when:true', () => {
        expect(
          basic.can('superadmin', 'foo', 'create', {userId: 1, ownerId: 1})
        ).toEqual(true);
        expect(basic['_rulesCompiled']['superadmin:foo:create']).toBeDefined();
      });
      test('can:when:false', () => {
        expect(
          basic.can('superadmin', 'foo', 'create', {userId: 1, ownerId: 2})
        ).toEqual(false);
        expect(basic['_rulesCompiled']['superadmin:foo:create']).toBeDefined();
      });
    });
  });
  describe('add', () => {});
  describe('remove', () => {});
});
