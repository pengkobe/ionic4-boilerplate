import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ngrxtodoReducer } from './../redux/ngrxtodo.reducer';

import { NgRxTodoComponent } from './ngrxtodo.page';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
import { NewTodoComponent } from './new-todo/new-todo.component';

const routes: Routes = [
  {
    path: '',
    component: NgRxTodoComponent,
    children: [
      {
        path: '',
        component: TodoListComponent,
      },
      {
        path: ':filter',
        component: TodoListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    NgRxTodoComponent,
    TodoComponent,
    TodoListComponent,
    FooterComponent,
    NewTodoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot({}),
    StoreModule.forFeature('ngrxtodo', ngrxtodoReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 15, //  Retains last 15 states
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgrxTodoPageModule {}
