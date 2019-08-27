import { actions, reducerPath, reducer, selectors, Todo } from './redux.todos';
import thunks from './thunks.todos';

// Default exports create some weird circular dependcy issues with our reducer/selectors since they
// receive global state via ambient declarations. Named exports works around this at the cost of
// needing to "import * as redux..." when used
export { reducer, reducerPath, selectors, actions, thunks };

// Types need to be manually reexported
export type Todo = Todo;
