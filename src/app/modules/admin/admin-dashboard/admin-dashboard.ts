import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollsService, Poll } from '../../../services/polls.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  polls: Poll[] = [];
  loading = true;
  error: string | null = null;
  deleteConfirm: number | null = null;

  constructor(
    private pollsService: PollsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(): void {
    this.loading = true;
    this.error = null;

    this.pollsService.getAllPolls().subscribe({
      next: (polls) => {
        this.polls = polls;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load polls';
        this.loading = false;
      },
    });
  }

  createPoll(): void {
    this.router.navigate(['/admin/polls/create']);
  }

  editPoll(pollId: number): void {
    this.router.navigate(['/admin/polls', pollId, 'edit']);
  }

  confirmDelete(pollId: number): void {
    this.deleteConfirm = pollId;
  }

  cancelDelete(): void {
    this.deleteConfirm = null;
  }

  deletePoll(pollId: number): void {
    this.pollsService.deletePoll(pollId).subscribe({
      next: () => {
        this.polls = this.polls.filter(p => p.id !== pollId);
        this.deleteConfirm = null;
      },
      error: (error) => {
        this.error = error.message || 'Failed to delete poll';
        this.deleteConfirm = null;
      },
    });
  }

  togglePollStatus(poll: Poll): void {
    const newStatus = poll.status === 'active' ? 'closed' : 'active';
    this.pollsService.updatePollStatus(poll.id, newStatus).subscribe({
      next: (updated) => {
        const index = this.polls.findIndex(p => p.id === poll.id);
        if (index > -1) {
          this.polls[index] = updated;
        }
      },
      error: (error) => {
        this.error = error.message || 'Failed to update poll status';
      },
    });
  }
}