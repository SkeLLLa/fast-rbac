import RBAC from '../src';
const a = new RBAC({
  roles: {
    user: {can: ['cat:create', 'dog:*', {name: 'foo', operation: 'read'}]},
    prouser: {can: ['cat:update'], inherits: ['user', 'reader']},
    admin: {can: ['*']},
    reader: {can: ['*:read'], inherits: ['anon']},
    anon: {
      can: [
        {
          name: '*:read',
          when: (ctx) => {
            const result: Promise<boolean> = new Promise((resolve) => {
              resolve(ctx.color === 'red');
            });
            return result;
          },
        },
      ],
    },
  },
});

console.log(a.can('user', 'dog', 'read'));
