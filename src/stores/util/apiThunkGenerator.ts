/* eslint-disable @typescript-eslint/no-explicit-any */

import { AsyncActionCreator } from 'typesafe-actions';
import { Dispatch } from 'redux';

// Assumes same prop is passed to both redux action and api call
// Look into ways we can make this more typesafe.
// It's a bit difficult to figure out with all the generic types + utility functions for ts-actions
function thunkGenerator<PropType>(asyncAction: AsyncActionCreator<any, any, any, any>, apiCall: any) {
  return (thunkProps?: PropType) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(asyncAction.request(thunkProps));

    const [error, result] = await apiCall(thunkProps);

    if (error) {
      dispatch(asyncAction.failure(error));
    } else if (result) {
      // if !error then result exists, typescript can't quite infer this though
      dispatch(asyncAction.success(result.data.results));
    }
  };
}

export default thunkGenerator;
