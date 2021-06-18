import RBAC from '../src';
import { inspect } from 'util';

const a = new RBAC({
  roles: {
    user: { can: ['cat:create', 'dog:*', { name: 'foo', operation: 'read' }] },
    prouser: { can: ['cat:update'], inherits: ['user', 'reader'] },
    admin: { can: ['*'] },
    reader: { can: ['*:read'], inherits: ['anon'] },
    anon: {
      can: [
        {
          name: '*:read',
          when: (ctx: { color: string }) => {
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

console.log(inspect(a, false, 5));
console.log(a.can('user', 'dog', 'read'));
