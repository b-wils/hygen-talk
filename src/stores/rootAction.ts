import * as auth from './Auth';
import * as todos from './Todos';

const rootAction = {
  auth: auth.actions,
  todos: todos.actions,
};

export default rootAction;
