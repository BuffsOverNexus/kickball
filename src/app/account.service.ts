import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from './account';
import { catchError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient, private errorService: ErrorService) {}

  createAccount(username: String, password: String) {
    return this.httpClient
      .post<Account>(environment.host + '/account', {
        username,
        password,
      })
      .pipe(catchError(this.errorService.handleError));
  }

  getAccount(id: number) {
    console.log(id, environment.host);
    return this.httpClient
      .get<Account>(environment.host + '/account', {
        params: { id },
      })
      .pipe(catchError(this.errorService.handleError));
  }

  getLogin(username: string, password: string) {
    return this.httpClient
      .get<Account>(environment.host + '/login', {
        params: { username, password },
      })
      .pipe(catchError(this.errorService.handleError));
  }

  
}
