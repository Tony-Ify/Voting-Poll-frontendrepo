import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollsService, Poll } from '../../../services/polls.service';
import { VotesService } from '../../../services/votes.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss'],
})
export class PollDetailComponent implements OnInit {
  poll: Poll | null = null;
  loading = true;
  error: string | null = null;
  selectedOptionId: number | null = null;
  userState: string = '';
  submitting = false;
  hasVoted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollsService: PollsService,
    private votesService: VotesService,
    private authService: AuthService,
  ) {
    const user = this.authService.getCurrentUser();
    this.userState = user?.state || '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadPoll(params['id']);
      this.checkUserVote(params['id']);
    });
  }

  loadPoll(id: number): void {
    this.loading = true;
    this.pollsService.getPollById(id).subscribe({
      next: (poll) => {
        this.poll = poll;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  checkUserVote(pollId: number): void {
    this.votesService.getUserPollVote(pollId).subscribe({
      next: (vote) => {
        if (vote) {
          this.hasVoted = true;
          this.selectedOptionId = vote.optionId;
        }
      },
    });
  }

  selectOption(optionId: number): void {
    if (!this.hasVoted) {
      this.selectedOptionId = optionId;
    }
  }

  submitVote(): void {
    if (!this.selectedOptionId || !this.poll) return;

    this.submitting = true;
    this.votesService
      .submitVote(this.poll.id, this.selectedOptionId, this.userState)
      .subscribe({
        next: () => {
          this.submitting = false;
          this.hasVoted = true;
          this.router.navigate(['/polls', this.poll?.id, 'results']);
        },
        error: (error) => {
          this.error = error.message || 'Failed to submit vote';
          this.submitting = false;
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}