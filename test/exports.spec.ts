import { describe, test, expect } from '@jest/globals';
import module from '../src/index';
import { name } from '../package.json';

describe(name, () => {
  test('module exported', () => {
    expect(module).toBeDefined();
  });

  test('interface exported', () => {
    expect(typeof module.prototype.can).toBe('function');
    expect(typeof module.prototype.add).toBe('function');
    expect(typeof module.prototype.remove).toBe('function');
  });
});
