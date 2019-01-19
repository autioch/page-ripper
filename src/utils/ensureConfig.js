const isObject = (value) => value !== null && typeof value === 'object';

const STACK_FUNC_NAME = new RegExp(/at ([^ ]+).+/);

function callerName() {
  const err = new Error();

  // Error.captureStackTrace(err);

  const [,, , callerLine] = err.stack.split('\n');
  const [, fnName] = STACK_FUNC_NAME.exec(callerLine);

  return fnName;
}

module.exports = function ensureConfig(config, optionName, expectedType) {
  if (!isObject(config)) {
    throw Error(`${callerName()} requires config object`);
  }

  const option = config[optionName];

  if (option === undefined || option === null || typeof option !== expectedType) { // eslint-disable-line no-undefined
    throw Error(`${callerName()} requires "${optionName}" ${expectedType} in config, got ${typeof option}`);
  }
};
