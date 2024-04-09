import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/core/models/task/task.interface';
import { User } from 'src/app/core/models/user/user.interface';
import { SessionService } from 'src/app/core/services/session/session.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { TaskModalComponent } from '../add-task-modal/task-modal.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {

  public tasks: Observable<Task[]> = of([]);
  public user: User | null;
  public searchValue = '';


  constructor(
    public readonly taskService: TaskService,
    private readonly modalService: NgbModal,
    private readonly toastService:ToastService,
    private readonly sessionService: SessionService) {

    this.tasks = this.taskService.getTaskByUserId();
    this.user = this.sessionService.getUserInfo();
  }


  public onCheckChange(task: Task): void {
    const taskUpdated: Task = { ...task, completed: !task.completed }
    this.updateTask(taskUpdated)
  }

  public openAddTaskModal(): void {
    const modalRef = this.modalService.open(TaskModalComponent);
    modalRef.componentInstance.onSaveTask.subscribe((newTask: Partial<Task>) => {
      if (newTask){
        this.taskService.createTask(newTask).subscribe(() => this.tasks = this.taskService.getTaskByUserId());
        this.toastService.show('Tarea agregada correctamente')
      }
      modalRef.close();
    })
  }

  public openEditTaskModal(task: Task): void {
    const modalRef = this.modalService.open(TaskModalComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.onSaveTask.subscribe((taskUpdated: Task) => {
      if (taskUpdated) this.updateTask(taskUpdated);
      modalRef.close();
    })
  }

  public deleteTask({ id }: Task) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.taskService.getTaskByUserId();
      this.toastService.show('Tarea eliminada correctamente')
    });
  }

  private updateTask(taskUpdated: Task) {
    this.taskService.editTask(taskUpdated).subscribe(() => {
      this.tasks = this.taskService.getTaskByUserId()
      this.toastService.show('Tarea actualizada correctamente')
    });
  }
}