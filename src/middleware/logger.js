// Logger to show in anytime that a new action is dispatched.
const logger = (store) => (next) => (action) => {

  // What the new state is going to be after it's dispatched.
  console.group(action.type);
  // Log what the action is by just console logging action.
  console.log("The action: ", action);
  // Get a return value.
  const returnValue = next(action);
  // Update/Get the state by calling 'store.getState'.
  console.log("The new state: ", store.getState());
  console.groupEnd();
  //return value here.
  return returnValue;
};

export default logger;
