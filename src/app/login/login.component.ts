import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private accountService: AccountService, private sessionService: SessionService, private router: Router) {}

  form: FormAccount = {
    id: 0,
    username: '',
    password: '',
  };

  errors: string[] = [];


  login() {
    // Reset errors
    this.errors = [];

    if (!this.form.username) {
      this.errors.push('Unable to login: Missing username.');
      return;
    }
    if (!this.form.password) {
      this.errors.push('Unable to login: Missing password.');
      return;
    }

    // Determine if the account exists.
    this.accountService
      .getLogin(this.form.username, this.form.password)
      .subscribe({
        next: (account: Account) => {
          // Login the user
          this.sessionService.login(account.id, account.username);
          console.log(this.sessionService.getAccountId());
          console.log(account);
          this.router.navigate(['teams']);
        },
        error: () => {
          this.errors.push(
            `The credentials you entered in are invalid. Please try again or attempt a recovery.`
          );
          // Reset password field
          this.form.password = "";
        },
      });
  }
}

interface FormAccount extends Account {
  password: string;
}