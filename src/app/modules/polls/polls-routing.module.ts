import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollListComponent } from './poll-list/poll-list';
import { PollDetailComponent } from './poll-detail/poll-detail';
import { ResultsComponent } from './results/results';

const routes: Routes = [
  { path: '', component: PollListComponent },
  { path: ':id', component: PollDetailComponent },
  { path: ':id/results', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollsRoutingModule {}