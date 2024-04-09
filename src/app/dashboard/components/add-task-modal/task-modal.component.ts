import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/core/models/task/task.interface';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {

  public title: string = 'Tarea';
  public taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  private _task!: Task;

  @Input()
  set task(task: Task) {
    this._task = task;
    this.taskForm.setValue({ title: task?.title || '', description: task?.description || '' })
  }

  @Output() onSaveTask = new EventEmitter<Task>();

  public saveTask(): void {
    const { title, description } = this.taskForm.value;
    this.onSaveTask.emit({ ...this._task, title, description } as Task);
  }

  public cancelEdit(): void {
    this.onSaveTask.emit();
  }
}
