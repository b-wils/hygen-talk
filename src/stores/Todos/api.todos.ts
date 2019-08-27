import apiCall from '../util/apiCall';

import { Todo } from './redux.todos';

interface TodosResponse {
  results: [Todo];
}

// API
export const getAllTodos = () => {
  return apiCall<TodosResponse>({ url: 'todos', method: 'GET' });
};

export const addTodo = (todo: Todo) => {
  return apiCall<Todo>({ url: 'todos', method: 'POST', data: todo });
};
