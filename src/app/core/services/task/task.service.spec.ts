import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from '../../models/task/task.interface';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Should call POST method and create url using userId', () => {
    const taskMock = {  title: 'title', completed: true, description: 'des' }
    const spy = spyOn(service['sessionService'],'getUserInfo').and.returnValue({ userId: 1 } as any)
    service.createTask(taskMock as Task).subscribe(data => {
      expect(data).toBeTruthy();
    });
    const httpMock = httpTestingController.expectOne(service['url']);

    expect(spy).toHaveBeenCalled();
    expect(httpMock.request.method).toBe('POST');
  });

  it('Should call GET method and use userInfo to create the url', () => {
    const id = 1;
    const spy = spyOn(service['sessionService'], 'getUserInfo').and.returnValue({ id } as any)
    service.getTaskByUserId().subscribe(data => {
      expect(data).toBeTruthy();
    });
    const httpMock = httpTestingController.expectOne(`${service['url']}?userId=${id}`);

    expect(spy).toHaveBeenCalled();
    expect(httpMock.request.method).toBe('GET');
  });

  it('Should call put method and pass taskId', () => {
    const taskMock = { id: 123, title: 'title', userId: 1 }
    service.editTask(taskMock as Task).subscribe(data => {
      expect(data).toBeTruthy();
    });
    const httpMock = httpTestingController.expectOne(service['url'] + '/' + taskMock.id);

    expect(httpMock.request.method).toBe('PUT');
    expect(httpMock.request.body).toEqual(taskMock);
  });

  it('Should call delete method and pass the taskId', () => {
    const taskId = 1;
    service.deleteTask(taskId).subscribe(data => {
      expect(data).toBeTruthy();
    });
    const httpMock = httpTestingController.expectOne(service['url'] + '/' + taskId);
    expect(httpMock.request.method).toBe('DELETE');
  });
});
