import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from './../../redux/ngrxtodo.reducer';
import * as TodoActions from './../../redux/todo/todo.actions';
import { getFilter, getTodos } from './../../redux/todo/todo.selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  countTodos: number;
  currentFilter: string;
  showFooter: boolean;

  constructor(private store: Store<AppState>) {
    this.readFilterState();
    this.readTodosState();
  }

  ngOnInit() {}

  clearCompleted() {
    const action = new TodoActions.ClearCompletedAction();
    this.store.dispatch(action);
  }

  completedAll() {
    const action = new TodoActions.CompletedAllAction();
    this.store.dispatch(action);
  }

  private readTodosState() {
    this.store.pipe(select(getTodos)).subscribe(todos => {
      this.countTodos = todos.filter(t => !t.completed).length;
      this.showFooter = todos.length > 0;
    });
  }

  private readFilterState() {
    this.store.pipe(select(getFilter)).subscribe(fitler => {
      this.currentFilter = fitler;
    });
  }
}
