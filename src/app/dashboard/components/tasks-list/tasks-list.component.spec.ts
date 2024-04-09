import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FilterPipeModule } from 'src/app/common/filter/filter.module';
import { Task } from 'src/app/core/models/task/task.interface';
import { SessionService } from 'src/app/core/services/session/session.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TasksListComponent } from './tasks-list.component';

const mockSessionService = {
  getUserInfo: () => {
    return {
      name: 'Pedro',
      lastname: 'Ortiz',
      email: 'pedro@email.com',
      id: 1
    }
  }
}
const taskMock = { id: 1, title: 'Homework', description: 'Science', completed: false, userId: 2 };
class mockTaskService {
  getTaskByUserId() { return of([taskMock]) }
  createTask() { return of({}) }
  editTask() { return of({})}
  deleteTask() { return of({})}
}

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksListComponent, TaskModalComponent],
      imports: [HttpClientTestingModule, FilterPipeModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: TaskService, useClass: mockTaskService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should edit field completed when checkbox have been clicked', () => {

    const checkbox = fixture.debugElement.query(By.css('#check' + taskMock.id)).nativeElement as HTMLInputElement;
    const spyEditTask = spyOn(component.taskService, 'editTask').and.callThrough();
    const spyToast = spyOn(component['toastService'], 'show');
    checkbox.click();
    expect(checkbox).toBeTruthy();
    expect(spyEditTask).toHaveBeenCalledWith({ ...taskMock, completed: !taskMock.completed });
    expect(spyToast).toHaveBeenCalled();
  });

  it('Should remove the element when button is clicked', () => {

    const btn = fixture.debugElement.query(By.css('#delete-btn' + taskMock.id)).nativeElement as HTMLInputElement;
    const spyDeleteTask = spyOn(component.taskService, 'deleteTask').and.callThrough();
    btn.click();
    expect(btn).toBeTruthy();
    expect(spyDeleteTask).toHaveBeenCalledWith(taskMock.id);
  });

  it('Should open the modal when edit button is clicked', () => {

    const btn = fixture.debugElement.query(By.css('#edit-btn' + taskMock.id)).nativeElement as HTMLInputElement;
    const spyOpenModal = spyOn(component['modalService'], 'open').and.callThrough();;
    const spyUpdateTask = spyOn<any>(component, 'updateTask').and.callThrough();;
    btn.click();

    component['modalRef'].componentInstance.onSaveTask.emit({} as Task);
    expect(component['modalService'].hasOpenModals()).toBeTrue();
    expect(spyOpenModal).toHaveBeenCalled();
    expect(spyUpdateTask).toHaveBeenCalledWith({} as Task);


  });

  it('Should open modal and call createTask service ', () => {

    const spyOpenModal = spyOn(component['modalService'], 'open').and.callThrough();;
    const spyCreateTask = spyOn(component['taskService'], 'createTask').and.callThrough();;

    component.openAddTaskModal();

    component['modalRef'].componentInstance.onSaveTask.emit({} as Task);
    expect(component['modalService'].hasOpenModals()).toBeTrue();
    expect(spyOpenModal).toHaveBeenCalled();
    expect(spyCreateTask).toHaveBeenCalledWith({} as Task);

  });
});