import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from './player';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private httpClient: HttpClient, private errorService: ErrorService) { }

  getRandomBattingOrder(teamId: string, ineligible: string[]) {
    return this.httpClient
      .post<Player[]>(environment.host + '/generate/batting', {
        teamId,
        ineligible
      })
      .pipe(catchError(this.errorService.handleError));
  }
}
