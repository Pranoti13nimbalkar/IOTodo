import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from '../../models/todo';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    @Input() todos! :Array<ITodo>
    @Output() emitRemoveTodo : EventEmitter<string>= new EventEmitter<string>()
    @Output() emitEditTodo: EventEmitter<ITodo> = new EventEmitter<ITodo>()
  
  constructor(private _matDailog : MatDialog) { }

  ngOnInit(): void {
  }
trackById(index:number, trackById:ITodo){
return trackById
}

onEditTodo(todo: ITodo){
    this.emitEditTodo.emit(todo)
}

onRemoveTodo(id:string){
    let matConfig = new MatDialogConfig()
  matConfig.disableClose=true,
  matConfig.data={
    msg : `Do You want to remove todoItem with  ${id} `
  }
  let matDailogRef=this._matDailog.open(GetConfirmComponent, matConfig)
  matDailogRef.afterClosed()
    .subscribe(item=>{
      if(item){
         this.emitRemoveTodo.emit(id)
      }
    })
   
}
}
