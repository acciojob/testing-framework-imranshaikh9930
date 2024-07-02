//your JS code here. If required.
function describe(testSuiteName, callback) {
  console.log(`beginning test suite ${testSuiteName}`);
  try {
    callback();
    console.log(`successfully completed test suite ${testSuiteName}`);
  } catch (error) {
    console.error(`failed running test suite ${testSuiteName} on test case ${error.testCaseName} with error message ${error.message}`);
  }
}

function it(testCaseName, callback) {
  console.log(`beginning test case ${testCaseName}`);
  try {
    callback();
    console.log(`successfully completed test case ${testCaseName}`);
  } catch (error) {
    error.testCaseName = testCaseName;
    throw error;
  }
}

function expect(actual) {
  return {
    toExist() {
      if (actual === null || actual === undefined) {
        throw new Error(`expected value to exist but got ${JSON.stringify(actual)}`);
      }
    },
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
      }
    },
    toBeType(type) {
      if (typeof actual !== type) {
        throw new Error(`expected ${JSON.stringify(actual)} to be of type ${type} but got ${typeof actual}`);
      }
    }
  };
}

// Sample Usage #1
describe('Passing Test Suite', () => {
  it('Passing Test Case #1', () => {
    expect('foo').toExist();
    expect(1 + 1).toBe(2);
  });
  it('Passing Test Case #2', () => {
    expect({}).toBeType('object');
  });
});

// Sample Usage #2
describe('Failing Test Suite', () => {
  it('Passing Test Case', () => {
    expect(0).toBe(0);
  });
  it('Failing Test Case', () => {
    expect(true).toBe(true);
    expect(true).toBe(false);
  });
  it('Unreachable Test Case', () => {
    expect('foo').toBe('bar');
  });
});
