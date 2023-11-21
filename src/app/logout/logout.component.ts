import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit(): void {
      this.sessionService.logout();
      this.router.navigate(["account"]);
  }
}
