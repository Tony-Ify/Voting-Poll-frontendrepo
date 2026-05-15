import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { PollManagementComponent } from './poll-management/poll-management';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'polls/create', component: PollManagementComponent },
  { path: 'polls/:id/edit', component: PollManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}