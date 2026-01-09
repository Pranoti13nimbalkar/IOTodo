import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../models/todo';
import { todoArr } from '../../const/todo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {
 newTodoArr:Array<ITodo>=todoArr;
 constructor( private _matSnackBar : MatSnackBar) {
  this.getTodoFromLS()
  }

  ngOnInit(): void {
  }
 setTodoToLS(){
   localStorage.setItem('todos', JSON.stringify(this.newTodoArr));
 }

 getTodoFromLS(){
  let todo = localStorage.getItem('todos');
  if (todo) {
    this.newTodoArr = JSON.parse(todo);
  }
 }
 editTodo !: ITodo
 
getNewTodo(todo:ITodo){
    this.newTodoArr.unshift(todo)
    this.setTodoToLS()
    
     this._matSnackBar.open(` ${todo.todoItem}  with id ${todo.todoId} Added  Successfuly!!` , "close", {
      horizontalPosition :'center',
      verticalPosition:'top',
      duration:2000
    })
}
getEditObj(todo: ITodo){
  this.editTodo = todo
 this._matSnackBar.open(` ${todo.todoItem}  with id ${todo.todoId} Patch  Successfuly!!` , "close", {
      horizontalPosition :'center',
      verticalPosition:'top',
      duration:2000
    })
}
getUpdatedObj(todo:ITodo){
   let getIndex = this.newTodoArr.findIndex(t=>t.todoId === todo.todoId)
   this.newTodoArr[getIndex] = todo
   this.setTodoToLS()
   this._matSnackBar.open(` ${todo.todoItem}  with id ${todo.todoId} Updeted  Successfuly!!` , "close", {
      horizontalPosition :'center',
      verticalPosition:'top',
      duration:2000
    })
}
getRemoveTodoId(removeId : string){
    this.newTodoArr = this.newTodoArr.filter(todo => todo.todoId != removeId)
    this.setTodoToLS()
    this._matSnackBar.open(` TodoItem  Remove  Successfuly!!` , "close", {
      horizontalPosition :'center',
      verticalPosition:'top',
      duration:2000
    })
}
}
