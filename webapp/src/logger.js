/* eslint-disable no-console */

export default function loggerMiddleware(store) {
  return (next) => (action) => {
    // console.group(action.type);
    console.info('Action', action.type);

    const result = next(action);

    // console.log('next state', store.getState());
    // console.groupEnd();

    return result;
  };
}
