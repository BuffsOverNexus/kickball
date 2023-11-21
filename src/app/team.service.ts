import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Team } from './team';
import { Roster } from './roster';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {}

  createTeam(name: string, accountId: string) {
    return this.httpClient
      .post<Team>(environment.host + '/team', { name, accountId })
      .pipe(catchError(this.errorService.handleError));
  }

  getTeam(id: string) {
    return this.httpClient
      .get<Team>(environment.host + '/team', { params: { id } })
      .pipe(catchError(this.errorService.handleError));
  }

  getRoster(teamId: string) {
    return this.httpClient
      .get<Roster>(environment.host + '/roster', { params: { teamId } })
      .pipe(catchError(this.errorService.handleError));
  }

  getTeamsByAccount(accountId: string) {
    return this.httpClient
      .get<Team[]>(environment.host + '/teams', { params: { accountId } })
      .pipe(catchError(this.errorService.handleError));
  }
}
