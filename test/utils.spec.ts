import { describe, test, expect } from '@jest/globals';
import { mergeRoles, flatten } from '../src/utils';

describe('utils', () => {
  describe('mergeRoles', () => {
    const foo = {
      a: 1,
      b: {
        c: 1,
        d: 2,
      },
    };

    const bar = {
      a: 2,
      b: {
        d: 3,
        e: 4,
      },
    };

    const foobar = {
      a: 2,
      b: {
        c: 1,
        d: 3,
        e: 4,
      },
    };
    test('merges object', () => {
      expect(mergeRoles({}, foo, bar)).toEqual(foobar);
    });
  });
  describe('flatten', () => {
    const foo = {
      a: {
        b: {
          c: 1,
          d: {
            e: 2,
          },
        },
        f: 3,
      },
      g: 4,
    };

    const fooFlat = {
      'a.b.c': 1,
      'a.b.d.e': 2,
      'a.f': 3,
      'g': 4,
    };

    const fooFlatSep = {
      'a:b:c': 1,
      'a:b:d:e': 2,
      'a:f': 3,
      'g': 4,
    };

    const invalid = {
      a: undefined,
      b: null,
    };

    test('default separator', () => {
      expect(flatten(foo)).toEqual(fooFlat);
    });

    test('custom separator', () => {
      expect(flatten(foo, ':')).toEqual(fooFlatSep);
    });

    test('invalid object', () => {
      expect(flatten(invalid)).toEqual(invalid);
    });
  });
});
