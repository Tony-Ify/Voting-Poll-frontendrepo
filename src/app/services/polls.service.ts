import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface PollOption {
  id: number;
  optionText: string;
  displayOrder: number;
}

export interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'closed';
  createdBy: { id: number; name: string };
  options: PollOption[];
  totalVotes?: number;
  createdAt?: string;
  closedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  private endpoint = '/polls';

  constructor(private apiService: ApiService) {}

  getAllPolls(): Observable<Poll[]> {
    return this.apiService.get<Poll[]>(this.endpoint);
  }

  getActivePools(): Observable<Poll[]> {
    return this.apiService.get<Poll[]>(`${this.endpoint}?status=active`);
  }

  getClosedPools(): Observable<Poll[]> {
    return this.apiService.get<Poll[]>(`${this.endpoint}?status=closed`);
  }

  getPollById(id: number): Observable<Poll> {
    return this.apiService.get<Poll>(`${this.endpoint}/${id}`);
  }

  createPoll(data: {
    title: string;
    description: string;
    options: { optionText: string }[];
  }): Observable<Poll> {
    return this.apiService.post<Poll>(this.endpoint, data);
  }

  updatePoll(
    id: number,
    data: {
      title: string;
      description: string;
      options: { optionText: string }[];
    },
  ): Observable<Poll> {
    return this.apiService.put<Poll>(`${this.endpoint}/${id}`, data);
  }

  updatePollStatus(id: number, status: 'active' | 'closed'): Observable<Poll> {
    return this.apiService.patch<Poll>(`${this.endpoint}/${id}/status`, { status });
  }

  deletePoll(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}