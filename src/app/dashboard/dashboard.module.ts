import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from '../common/filter/filter.module';

@NgModule({
  declarations: [
    DashboardComponent,
    TasksListComponent,
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule
  ]
})
export class DashboardModule { }
