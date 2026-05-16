import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

export interface PollOption {
  id: number;
  pollId: number;
  optionText: string;
  displayOrder: number;
  createdAt: Date;
  voteCount?: number;
  percentage?: number;
}

export interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'closed';
  createdById: number;
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
  options: PollOption[];
  totalVotes?: number;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

export interface CreatePollRequest {
  title: string;
  description?: string;
  options: { optionText: string; displayOrder?: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private apiService: ApiService) {}

  getAllPolls(status?: 'active' | 'closed'): Observable<Poll[]> {
    const endpoint = status ? `/polls?status=${status}` : '/polls';
    return this.apiService.get<Poll[]>(endpoint);
  }

  getActivePools(): Observable<Poll[]> {
    return this.apiService.get<Poll[]>('/polls/active');
  }

  getClosedPools(): Observable<Poll[]> {
    return this.apiService.get<Poll[]>('/polls/closed');
  }

  getPollById(id: number): Observable<Poll> {
    return this.apiService.get<Poll>(`/polls/${id}`);
  }

  createPoll(poll: CreatePollRequest): Observable<Poll> {
    return this.apiService.post<Poll>('/polls', poll);
  }

  updatePoll(id: number, poll: Partial<CreatePollRequest>): Observable<Poll> {
    return this.apiService.put<Poll>(`/polls/${id}`, poll);
  }

  updatePollStatus(
    id: number,
    status: 'active' | 'closed',
  ): Observable<Poll> {
    return this.apiService.patch<Poll>(`/polls/${id}/status`, { status });
  }

  deletePoll(id: number): Observable<void> {
    return this.apiService.delete<void>(`/polls/${id}`);
  }
}
