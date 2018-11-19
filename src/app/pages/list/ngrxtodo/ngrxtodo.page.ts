import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../redux/ngrxtodo.reducer';
import { Todo } from './../redux/todo/todo.model';
import * as TodoActions from './../redux/todo/todo.actions';

@Component({
  selector: 'page-ngrxtodo-module',
  templateUrl: './ngrxtodo.page.html',
})
export class NgRxTodoComponent {
  constructor(private store: Store<AppState>, private router: Router) {
    this.populateTodos();
    this.updateTodos();
  }

  private populateTodos() {
    const todos: Todo[] = JSON.parse(
      localStorage.getItem('angular-ngrx-todos') ||
        '[{"id":1,"completed":false,"text":"test"}]'
    );
    this.store.dispatch(new TodoActions.PopulateTodosAction(todos));
  }

  private updateTodos() {
    this.store.select('todos').subscribe(todos => {
      if (todos) {
        localStorage.setItem('angular-ngrx-todos', JSON.stringify(todos));
      }
    });
  }

  backTolist() {
    this.router.navigateByUrl('tabs/(list:list)');
  }
}
