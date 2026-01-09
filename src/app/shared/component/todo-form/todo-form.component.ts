import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ITodo } from '../../models/todo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {
@ViewChild('todoForm')todoForm!: NgForm
@Output() emitTodo :EventEmitter<ITodo>=new EventEmitter<ITodo>();
@Output() emitUpdatedObj:EventEmitter<ITodo>=new EventEmitter<ITodo>()
isInEditMode:boolean =false;
@Input() getEditTodo !:ITodo
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['getEditTodo'].currentValue){
        this.isInEditMode=true;
     this.todoForm.form.patchValue(changes['getEditTodo'].currentValue)
    }
   
  }
onTodoAdd(){
  if(this.todoForm.valid){
    let todoObj ={
    ...this.todoForm.value,
    todoId : Date.now().toString()
  }
  console.log(todoObj)
  this.todoForm.reset()
  this.emitTodo.emit(todoObj)
  }
  
}

OnUpdate(){
  if(this.todoForm.valid){
    let Updated_obj : ITodo={
      ...this.todoForm.value,
      todoId:this.getEditTodo.todoId
    }
   
    this.emitUpdatedObj.emit(Updated_obj)
    this.isInEditMode=false;
     this.todoForm.reset()
  }
}
}
