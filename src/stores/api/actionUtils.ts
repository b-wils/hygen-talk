import 'array-flat-polyfill';

import rootActions from '../rootAction';

export const getActionFields = (action: string) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE|CANCEL)/.exec(action);

  if (!matches) return;

  const [, name, state] = matches;

  return { name, state };
};

export const getRequestActions = () => {
  return Object.values(rootActions)
    .map(reduxPath => Object.values(reduxPath))
    .flat()
    .map(action => action.request);
};

export const getSuccessActions = () => {
  return Object.values(rootActions)
    .map(reduxPath => Object.values(reduxPath))
    .flat()
    .map(action => action.success);
};
export const getFailureActions = () => {
  return Object.values(rootActions)
    .map(reduxPath => Object.values(reduxPath))
    .flat()
    .map(action => action.failure);
};

export const getCancelActions = () => {
  return Object.values(rootActions)
    .map(reduxPath => Object.values(reduxPath))
    .flat()
    .map(action => action.cancel);
};

// Can't quite get a generic function to work with type inference
// type asyncActionType = 'request' | 'success' | 'failure' | 'cancel'

// const getActionsFromType = (type: asyncActionTypes[] ) => {

//   // List of all our async actions
//   const asyncActions = Object.values(rootActions).map(reduxPath => Object.values(reduxPath)).flat()

//   const passedActions = type.map(actionType => asyncActions.map(action => action[actionType])).flat()

//   return passedActions;

// }
