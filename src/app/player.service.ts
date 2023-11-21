import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from './position';
import { Gender } from './gender';
import { environment } from 'src/environments/environment';
import { Player } from './player';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {}

  createPlayer(
    firstName: string,
    lastName: string,
    teamId: string,
    preferences: string[],
    gender: string
  ) {
    return this.httpClient
      .post<Player>(environment.host + '/player', {
        firstName,
        lastName,
        teamId,
        preferences,
        gender,
      })
      .pipe(catchError(this.errorService.handleError));
  }

  getPlayer(id: string) {
    return this.httpClient
      .get<Player>(environment.host + '/player', { params: { id } })
      .pipe(catchError(this.errorService.handleError));
  }
}
