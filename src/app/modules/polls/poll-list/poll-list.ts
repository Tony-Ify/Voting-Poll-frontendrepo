import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollsService, Poll } from '../../../services/polls.service';

@Component({
  selector: 'app-poll-list',
  standalone: false,
  templateUrl: './poll-list.html',
  styleUrls: ['./poll-list.css'],
})
export class PollListComponent implements OnInit {
  polls: Poll[] = [];
  loading = true;
  error: string | null = null;
  activeTab: 'active' | 'closed' = 'active';

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

    this.pollsService.getActivePools().subscribe({
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

  switchTab(tab: 'active' | 'closed'): void {
    this.activeTab = tab;
    this.loading = true;

    const request = tab === 'active' 
      ? this.pollsService.getActivePools() 
      : this.pollsService.getClosedPools();

    request.subscribe({
      next: (polls) => {
        this.polls = polls;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  votePoll(pollId: number): void {
    this.router.navigate(['/polls', pollId]);
  }

  viewResults(pollId: number): void {
    this.router.navigate(['/polls', pollId, 'results']);
  }
}