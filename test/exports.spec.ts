import 'jest';
import module from '../src/index';
const {name} = require('../package.json');

describe(name, () => {
  test('module exported', async () => {
    expect(module).toBeDefined();
  });
});
