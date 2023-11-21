import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private sessionService: SessionService) {}

  isLoggedIn: boolean = false;

  ngOnInit(): void {
      this.isLoggedIn = this.sessionService.isLoggedIn();
  }

}
