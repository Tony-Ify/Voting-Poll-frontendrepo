import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { PollManagementComponent } from './poll-management/poll-management';

@NgModule({
  declarations: [AdminDashboardComponent, PollManagementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}