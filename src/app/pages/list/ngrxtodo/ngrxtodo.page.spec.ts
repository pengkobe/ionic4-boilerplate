import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ngrxtodoReducer, AppState } from './../redux/ngrxtodo.reducer';
import * as TodoActions from './../redux/todo/todo.actions';

import { TodoComponent } from './todo/todo.component';
import { FooterComponent } from './footer/footer.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NgRxTodoComponent } from './ngrxtodo.page';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgRxTodoComponent,
        TodoComponent,
        FooterComponent,
        TodoListComponent,
        NewTodoComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: TodoListComponent },
        ]),
        StoreModule.forRoot({}),
        StoreModule.forFeature('ngrxtodo', ngrxtodoReducer),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should be created', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    spyOn(localStorage, 'getItem').and.returnValue('[]');

    const fixture = TestBed.createComponent(NgRxTodoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Test for populateTodos', () => {
    it('should dispatch an action with item in localStorage', () => {
      const store = TestBed.get(Store);
      spyOn(store, 'dispatch').and.callThrough();

      spyOn(localStorage, 'getItem').and.returnValue('[]');

      const fixture = TestBed.createComponent(NgRxTodoComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      const action = new TodoActions.PopulateTodosAction([]);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    // it('should dispatch an action with null in localStorage', () => {
    //   const store = TestBed.get(Store);
    //   spyOn(store, 'dispatch').and.callThrough();

    //   spyOn(localStorage, 'getItem').and.returnValue(null);
    //   const fixture = TestBed.createComponent(NgRxTodoComponent);
    //   const component = fixture.componentInstance;
    //   fixture.detectChanges();

    //   const action = new TodoActions.PopulateTodosAction([]);
    //   expect(store.dispatch).toHaveBeenCalledWith(action);
    // });
  });

  describe('Test for updateTodos', () => {
    it('should called localStorage.setItem', () => {
      const store = TestBed.get(Store);
      spyOn(store, 'dispatch').and.callThrough();

      spyOn(localStorage, 'getItem').and.returnValue('[]');
      spyOn(localStorage, 'setItem').and.callThrough();

      const fixture = TestBed.createComponent(NgRxTodoComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      // expect(localStorage.setItem).toHaveBeenCalledWith(
      //   'angular-ngrx-todos',
      //   '[]'
      // );
    });
  });
});
