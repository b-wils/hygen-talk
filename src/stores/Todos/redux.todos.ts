import { combineReducers } from 'redux';
import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';

import Types from 'MyTypes';
import { ErrorPayload } from '../api';

// Constants
export const reducerPath = 'todos';

// Model
export interface Todo {
  text: string;
  id?: number;
}

// Actions
// It would be nice to dynamically construct these but it causes issues with type inference
const fetchTodosAsync = createAsyncAction(
  'todos/FETCH_TODOS_REQUEST',
  'todos/FETCH_TODOS_SUCCESS',
  'todos/FETCH_TODOS_FAILURE',
  'todos/FETCH_TODOS_CANCEL',
)<undefined, Todo[], ErrorPayload, string>();

const addTodoAsync = createAsyncAction(
  'todos/ADD_TODO_REQUEST',
  'todos/ADD_TODO_SUCCESS',
  'todos/ADD_TODO_FAILURE',
  'todos/ADD_TODO_CANCEL',
)<Todo, Todo, ErrorPayload, string>();

export const actions = {
  fetchTodosAsync,
  addTodoAsync,
};

// Types
export interface TodosState {
  todos: Todo[];
}

export type TodosAction = ActionType<typeof actions>;

// Initial state
const initialState: TodosState = {
  todos: [],
};

// Reducers
export const reducer = combineReducers<TodosState, TodosAction>({
  todos: createReducer(initialState.todos)
    .handleAction(fetchTodosAsync.success, (state, action) => {
      return [...action.payload];
    })
    .handleAction(addTodoAsync.success, (state, action) => {
      return [...state, action.payload];
    }),
});

// Selectors
export const selectors = {
  getTodos: (state: Types.RootState) => state.todos.todos,
};
