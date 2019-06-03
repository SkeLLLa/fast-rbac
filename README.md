# fast-rbac

<div align="center">
  <img src="https://gitlab.com/m03geek/fast-rbac/raw/master/rbac.logo.svg" width="300" height="auto"/>

[![NPM Version](https://img.shields.io/npm/v/fast-rbac.svg)](https://www.npmjs.com/package/fast-rbac)
[![Downloads Count](https://img.shields.io/npm/dm/fast-rbac.svg)](https://www.npmjs.com/package/fast-rbac)
[![Vunerabilities Count](https://snyk.io/test/npm/fast-rbac/badge.svg)](https://www.npmjs.com/package/fast-rbac)
[![Build Status](https://gitlab.com/m03geek/fast-rbac/badges/master/pipeline.svg)](https://gitlab.com/m03geek/fast-rbac/commits/master)
[![License](https://img.shields.io/npm/l/fast-rbac.svg)](https://gitlab.com/m03geek/fast-rbac/blob/master/LICENSE)
[![Codecov](https://img.shields.io/codecov/c/gl/m03geek/fast-rbac.svg)](https://codecov.io/gl/m03geek/fast-rbac)
<!-- [![Coverage Status](https://gitlab.com/m03geek/fast-rbac/badges/master/coverage.svg)](https://gitlab.com/m03geek/fast-rbac/commits/master) -->
</div>

Implementation of RBAC module tuned to be fast

Main rules:

* No RegEx
* O(1) time complexity for checking rules
* Wildcard and inherited rules caching
* No foolproof checks (use docs, jsdoc, types and implement those checks on your side if necessary)
* Zero dependency

## ToC
- [fast-rbac](#fast-rbac)
  - [ToC](#toc)
  - [Installation](#installation)
  - [Features and requirements](#features-and-requirements)
  - [Usage](#usage)
  - [ToDo List](#todo-list)
  - [Docs](#docs)
  - [Changelog](#changelog)
  - [Repos info](#repos-info)
  - [See also](#see-also)
  - [License](#license)

## Installation

```sh
npm i fast-rbac --save
```

<sub>[Back to top](#toc)</sub>

## Features and requirements

* Wildcard rules support
* Inheritance support
* Typescript support
* Prebuilt browser amd and system modules

--- 

* Node.js `>=8.0.0`.

<sub>[Back to top](#toc)</sub>

## Usage

** NOTE **: No cyclic roles interherence. You've been warned.

`can` method returns `boolean` if 3 arguments are passed to it.
It could return `Promise` if rule has `when` function and `context` is passed.
Even if your `when` function doesn't consume any arguments you need to pass context (e.g. `null` or `{}`) in order to execute it.
Whithout `context` the function `when` will be not executed and `can` will return `true`.

```js
import RBAC from 'fast-rbac';
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

console.log(a.can('user', 'dog', 'read')); // true

(async () => {
  console.log(await a.can('anon', 'cat', 'read', {color: 'red'})); // true
})()

a.add('someone', 'something', 'read');
console.log(a.can('someone', 'something', 'read')); // true
console.log(a.can('someone', 'something', 'write')); // false
a.remove('someone', 'something', 'read');
console.log(a.can('someone', 'something', 'read')); // false

```

<sub>[Back to top](#toc)</sub>

## ToDo List

PRs welcome!

- [X] Add/delete roles in runtime
- [X] Add some unit tests
- [ ] Add possibility to add/delete roles inherits
- [ ] Deal with circular role interherence (but I'm totally ok with callstack error)

## Docs

See [docs](docs/README.md).

<sub>[Back to top](#toc)</sub>

## Changelog

See [changelog](CHANGELOG.md).

<sub>[Back to top](#toc)</sub>

## Repos info

* **Main** https://gitlab.com/m03geek/fast-rbac - preferred place for issues and PRs
* **Mirror** https://github.com/SkeLLLa/fast-rbac - only PRs accepted

<sub>[Back to top](#toc)</sub>

## See also

* [rbac](https://www.npmjs.com/package/rbac)
* [@rbac/rbac](https://www.npmjs.com/package/@rbac/rbac)
* [easy-rbac](https://www.npmjs.com/package/easy-rbac)

<sub>[Back to top](#toc)</sub>

## License

Licensed under [MIT](./LICENSE).

<sub>[Back to top](#toc)</sub>
