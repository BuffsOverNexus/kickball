import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private accountService: AccountService) {}

  account?: Account;

  ngOnInit(): void {
      this.accountService.getAccount(1).subscribe(account => {
        if (account) {
          this.account = account;
        } else {
          console.log("Unable to find account.");
        }
      });
  }

}
