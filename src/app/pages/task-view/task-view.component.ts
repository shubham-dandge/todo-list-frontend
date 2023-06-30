import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists : any[]=[];
  tasks: Task[]=[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.taskService.getTasks(params['listId']).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } 
        else {
          this.tasks = [];
        }
        
      }
    )
    this.taskService.getLists().subscribe((lists: List[]) => {;
      //this.lists = lists as any[];
      this.lists = lists;
    })
  }
  onTaskClick(tasks:Task){
    //We want to set a task to complete
    this.taskService.complete(tasks).subscribe(() =>{
      console.log("Completed Sucessfully");
    })
   

  }
}








