import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../models/todo';
import { todoArr } from '../../const/todo';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {
 newTodoArr:Array<ITodo>=todoArr;
 constructor() {
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
}
getEditObj(todo: ITodo){
  this.editTodo = todo
  // console.log(this.editTodo)
}
getUpdatedObj(todo:ITodo){
   let getIndex = this.newTodoArr.findIndex(t=>t.todoId === todo.todoId)
   this.newTodoArr[getIndex] = todo
   this.setTodoToLS()
}
getRemoveTodoId(removeId : string){
    this.newTodoArr = this.newTodoArr.filter(todo => todo.todoId != removeId)
    this.setTodoToLS()
}
}
