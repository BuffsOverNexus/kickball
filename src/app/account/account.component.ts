import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  constructor(private accountService: AccountService, private sessionService: SessionService, private router: Router) {}


  account?: Account;

  isLoggedIn: boolean = false;
  register: boolean = false;
  errors: string[] = [];

  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.isLoggedIn();
    if (this.sessionService.isLoggedIn()) {
      // Attempt to find the account.
      this.accountService
        .getAccount(this.sessionService.getAccountId())
        .subscribe({
          next: (account: Account) => { this.account = account; },
          error: (error) => {
            // Log them out to remove session data and force a login screen
            this.sessionService.logout();
            this.isLoggedIn = false;
            console.log(error);
          }
        });
    }
  }

  logout() {
    this.router.navigate(['logout']);
  }

  


}

