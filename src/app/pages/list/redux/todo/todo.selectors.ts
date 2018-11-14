import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './../ngrxtodo.reducer';
import { Todo } from './todo.model';

export const getTodoState = createFeatureSelector<AppState>('ngrxtodo');

export const getState = createSelector(
  getTodoState,
  (state: AppState) => {
    return state;
  }
);
export const getFilter = createSelector(
  getTodoState,
  (state: AppState) => {
    return state.filter;
  }
);
export const getTodos = createSelector(
  getTodoState,
  (state: AppState) => {
    return state.todos;
  }
);

export const getStateCompleted = createSelector(
  getTodos,
  todos => {
    return todos.every(todo => todo.completed);
  }
);

export const getVisibleTodos = createSelector(
  getTodos,
  getFilter,
  (todos: Todo[], filter: string) => {
    switch (filter) {
      default:
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
    }
  }
);
