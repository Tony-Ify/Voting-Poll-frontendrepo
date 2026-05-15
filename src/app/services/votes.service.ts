import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Vote {
  id: number;
  userId: number;
  pollId: number;
  optionId: number;
  state: string;
  createdAt: string;
}

export interface VoteStats {
  optionId: number;
  optionText: string;
  voteCount: number;
  percentage: number;
}

export interface PollResults {
  pollId: number;
  totalVotes: number;
  stats: VoteStats[];
}

export interface AllStatesVoteResultsDto {
  [key: string]: VoteStats[];
}

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  private endpoint = '/votes';

  constructor(private apiService: ApiService) {}

  submitVote(pollId: number, optionId: number, state: string): Observable<Vote> {
    return this.apiService.post<Vote>(this.endpoint, {
      pollId,
      optionId,
      state,
    });
  }

  getUserPollVote(pollId: number): Observable<Vote | null> {
    return this.apiService.get<Vote>(`${this.endpoint}/poll/${pollId}/user-vote`);
  }

  getPollVotes(pollId: number): Observable<Vote[]> {
    return this.apiService.get<Vote[]>(`${this.endpoint}/poll/${pollId}`);
  }

  getPollResults(pollId: number): Observable<PollResults> {
    return this.apiService.get<PollResults>(`/results/${pollId}`);
  }

  getPollResultsByState(pollId: number, state: string): Observable<PollResults> {
    return this.apiService.get<PollResults>(`/results/${pollId}?state=${state}`);
  }

  getPollResultsByAllStates(pollId: number): Observable<AllStatesVoteResultsDto> {
    return this.apiService.get<AllStatesVoteResultsDto>(`/results/${pollId}/by-states`);
  }
}