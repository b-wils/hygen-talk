import apiThunkGenerator from '../util/apiThunkGenerator';
import { actions, Todo } from './redux.todos';

import { getAllTodos, addTodo } from './api.todos';

const { fetchTodosAsync, addTodoAsync } = actions;

export const getAllTodosThunk = apiThunkGenerator<undefined>(fetchTodosAsync, getAllTodos);

export const addTodoThunk = apiThunkGenerator<Todo>(addTodoAsync, addTodo);

export default {
  getAllTodosThunk,
  addTodoThunk,
};
