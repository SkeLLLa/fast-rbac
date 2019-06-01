import 'jest';
import module from '../src/index';
const {name} = require('../package.json');

describe(name, () => {
  test('module exported', async () => {
    expect(module).toBeDefined();
  });

  test('interface exported', async () => {
    expect(module.prototype.can).toBeDefined();
    expect(module.prototype.add).toBeDefined();
    expect(module.prototype.remove).toBeDefined();
  });
});
