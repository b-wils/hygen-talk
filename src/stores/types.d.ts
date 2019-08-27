import { StateType, ActionType } from 'typesafe-actions';

declare module 'MyTypes' {
  export type Store = StateType<typeof import('./index').default>;
  export type RootAction = ActionType<typeof import('./rootAction').default>;
  export type RootState = StateType<ReturnType<typeof import('./rootReducer').default>>;
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: ActionType<typeof import('./rootAction').default>;
  }
}
