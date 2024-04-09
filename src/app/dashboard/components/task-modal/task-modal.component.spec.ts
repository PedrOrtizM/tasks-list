import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Task } from 'src/app/core/models/task/task.interface';
import { TaskModalComponent } from './task-modal.component';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskModalComponent ],
      imports:[ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should save button be clicked and emit form value ', () => {
    const btn = fixture.debugElement.query(By.css('#btn-save')).nativeElement as HTMLButtonElement;
    const spySave = spyOn(component.onSaveTask,'emit');
    component.taskForm.patchValue({  title: 'title', description: 'desc' })
    fixture.detectChanges();
    btn.click();
    expect(btn.disabled).toBeFalsy();
    expect(spySave).toHaveBeenCalledWith(component.taskForm.value as Task)

  });

  it('Should emit value when button cancel have been clicked', () => {
    
    const btnCancel = fixture.debugElement.query(By.css('#btn-cancel')).nativeElement as HTMLButtonElement;
    const spySave = spyOn(component.onSaveTask, 'emit');
    component.task = {} as Task;
    
    fixture.detectChanges();
    btnCancel.click();

    expect(spySave).toHaveBeenCalledWith()
  })
});
