import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PollsRoutingModule } from './polls-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PollListComponent } from './poll-list/poll-list';
import { PollDetailComponent } from './poll-detail/poll-detail';
import { VoteFormComponent } from '../votes/vote-form/vote-form';
import { ResultsComponent } from './results/results';

@NgModule({
  declarations: [
    PollListComponent,
    PollDetailComponent,
    VoteFormComponent,
    ResultsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PollsRoutingModule,
  ],
})
export class PollsModule {}