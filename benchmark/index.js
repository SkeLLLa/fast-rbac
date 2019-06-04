/* eslint-disable no-console */

const Benchmark = require('benchmark');
const rbacrbac = require('@rbac/rbac');
const PopularRBAC = require('rbac').RBAC;
const EasyRBAC = require('easy-rbac');
const FastRBAC = require('../dist').default;

const suite = new Benchmark.Suite();

(async () => {
  const basicRules = {
    user: {
      can: ['foo:read'],
    },
    admin: {
      can: ['foo:*'],
    },
    superadmin: {
      can: ['*'],
    },
  };
  const competitors = {
    rbacrbac: rbacrbac({enableLogger: false})(basicRules),
    rbac: new PopularRBAC({
      roles: ['superadmin', 'admin', 'user'],
      permissions: {
        foo: ['read', 'write'],
        bar: ['read'],
      },
      grants: {
        user: ['read_foo'],
        admin: ['read_foo', 'read_bar'],
        superadmin: ['read_foo', 'read_bar', 'write_foo'],
      },
    }),
    easyrbac: new EasyRBAC(basicRules),
    fastrbac: new FastRBAC({roles: basicRules}),
  };
  await competitors.rbac.init();

  suite
    .add('@rbac/rbac', {
      defer: true,
      fn: async function(deferred) {
        (await competitors.rbacrbac.can('user', 'foo:read')) &&
          (await competitors.rbacrbac.can('admin', 'foo:write')) &&
          (await competitors.rbacrbac.can('superadmin', 'bar:read'));
        deferred.resolve();
      },
    })
    .add('rbac:no_wildcard_support', {
      defer: true,
      fn: async function(deferred) {
        (await competitors.rbac.can('user', 'read', 'foo')) &&
          (await competitors.rbac.can('admin', 'write', 'foo')) &&
          (await competitors.rbac.can('superadmin', 'read', 'bar'));
        deferred.resolve();
      },
    })
    .add('easy-rbac', {
      defer: true,
      fn: async function(deferred) {
        (await competitors.rbacrbac.can('user', 'foo:read')) &&
          (await competitors.rbacrbac.can('admin', 'foo:write')) &&
          (await competitors.rbacrbac.can('superadmin', 'bar:read'));
        deferred.resolve();
      },
    })
    .add('fast-rbac', function() {
      competitors.fastrbac.can('user', 'foo', 'read') &&
        competitors.fastrbac.can('admin', 'foo', 'write') &&
        competitors.fastrbac.can('superadmin', 'bar', 'read');
    })
    .add('fast-rbac:defer', {
      defer: true,
      fn: async function(deferred) {
        (await competitors.fastrbac.can('user', 'foo', 'read')) &&
          (await competitors.fastrbac.can('admin', 'foo', 'write')) &&
          (await competitors.fastrbac.can('superadmin', 'bar', 'read'));
        deferred.resolve();
      },
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({async: true});
})();
