import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Vote {
  id: number;
  userId: number;
  pollId: number;
  optionId: number;
  state: string;
  createdAt: Date;
}

export interface PollResult {
  optionId: number;
  optionText: string;
  voteCount: number;
  percentage: number;
}

export interface PollResults {
  pollId: number;
  totalVotes: number;
  results: PollResult[];
}

export interface PollResultsByState {
  pollId: number;
  state: string;
  totalVotes: number;
  results: PollResult[];
}

export interface StateStats {
  state: string;
  voteCount: number;
}

export interface PollResultsByAllStates {
  pollId: number;
  totalVotes: number;
  optionStats: Array<{
    optionId: number;
    optionText: string;
    votesByState: { [state: string]: number };
    totalVotes: number;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  constructor(private apiService: ApiService) {}

  submitVote(
    pollId: number,
    optionId: number,
    state: string,
  ): Observable<Vote> {
    return this.apiService.post<Vote>('/votes', {
      pollId,
      optionId,
      state,
    });
  }

  getUserPollVote(pollId: number): Observable<Vote | null> {
    return this.apiService.get<Vote | null>(`/votes/user/${pollId}`);
  }

  getPollVotes(pollId: number): Observable<Vote[]> {
    return this.apiService.get<Vote[]>(`/votes/poll/${pollId}`);
  }

  getPollResults(pollId: number): Observable<PollResults> {
    return this.apiService.get<PollResults>(`/results/${pollId}`);
  }

  getPollResultsByState(pollId: number, state: string): Observable<PollResultsByState> {
    return this.apiService.get<PollResultsByState>(
      `/results/${pollId}/by-state?state=${state}`,
    );
  }

  getPollResultsByAllStates(
    pollId: number,
  ): Observable<PollResultsByAllStates> {
    return this.apiService.get<PollResultsByAllStates>(
      `/results/${pollId}/all-states`,
    );
  }
}