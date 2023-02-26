import { Component, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() tasks$: any;
  private subscription: any

  constructor(@Inject(TaskService) private taskService: any){ }

  ngOnInit(): void {
    this.showTasks()
  }


  async deleteTask(id:any){
    await this.taskService.deleteTask(id)
  }

  showTasks(){
    this.taskService.getTasks().subscribe((res:any)=>{
      this.tasks$ = res.body.tasks
    })
  }
}
