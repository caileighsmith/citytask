import { Component, Inject } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(@Inject(TaskService) private taskService: any){ }

  showTasks(){
    this.taskService.getTasks().subscribe((res:any)=>{
      console.log( Object.values (res.body))
    })
  }

}
