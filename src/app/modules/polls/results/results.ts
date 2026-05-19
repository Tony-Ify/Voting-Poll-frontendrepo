import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollsService, Poll } from '../../../services/polls.service';
import { VotesService, PollResults, AllStatesVoteResultsDto } from '../../../services/votes.service';

@Component({
  selector: 'app-results',
  standalone: false,
  templateUrl: './results.html',
  styleUrls: ['./results.css'],
})
export class ResultsComponent implements OnInit {
  poll: Poll | null = null;
  results: PollResults | null = null;
  loading = true;
  error: string | null = null;
  selectedState: string = '';
  states: string[] = [];
  allStatesResults: AllStatesVoteResultsDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private pollsService: PollsService,
    private votesService: VotesService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadPoll(params['id']);
      this.loadResults(params['id']);
    });
  }

  loadPoll(id: number): void {
    this.pollsService.getPollById(id).subscribe({
      next: (poll) => {
        this.poll = poll;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  loadResults(pollId: number): void {
    this.votesService.getPollResults(pollId).subscribe({
      next: (results) => {
        this.results = results;
        this.extractStates();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  extractStates(): void {
    if (this.results) {
      // Common Nigerian states
      this.states = [
       'ABIA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE',
       'BORNO', 'CROSS RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU',
       'GOMBE', 'IMO', 'JIGAWA', 'KADUNA', 'KANO', 'KATSINA', 'KEBBI',
       'KOGI', 'KWARA', 'LAGOS', 'NASARAWA', 'NIGER', 'OGUN', 'ONDO',
       'OSUN', 'OYO', 'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA',
       'YOBE', 'ZAMFARA'
      ];
    }
  }

  filterByState(): void {
    if (!this.selectedState || !this.poll) return;

    this.loading = true;
    this.votesService
      .getPollResultsByState(this.poll.id, this.selectedState)
      .subscribe({
        next: (results) => {
          this.results = results as any;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        },
      });
  }

  getPercentageBarWidth(percentage: number): string {
    return `${Math.min(percentage, 100)}%`;
  }
}