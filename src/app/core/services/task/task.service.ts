import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task/task.interface';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly url = '/tasks';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService) { }


  public getTaskByUserId() {
    const userInfo = this.sessionService.getUserInfo();
    return this.http.get<Task[]>(`${this.url}?userId=${userInfo?.id}`); 
  }

  public createTask(task: Partial<Task>) {
    const userInfo = this.sessionService.getUserInfo();
    return this.http.post(this.url, { ...task, userId: userInfo?.id });
  }

  public editTask(task: Task) {
    return this.http.put(`${this.url}/${task.id}`, task);
  }

  public deleteTask(taskId: number) {
    return this.http.delete(this.url + '/' + taskId);
  }

}
