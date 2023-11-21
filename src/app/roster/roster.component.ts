import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneratorService } from '../generator.service';
import { Player } from '../player';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit {
  constructor(
    private router: Router,
    private generatorService: GeneratorService,
    private sessionService: SessionService
  ) {}

  battingOrder: Player[] = [];

  ngOnInit(): void {
    // Determine if the person is logged in.
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['account']);
      return;
    }

    // Determine if a team has been selected
    if (!this.sessionService.hasTeam()) {
      this.router.navigate(['teams']);
    }
  }

  generate() {
    this.generatorService.getRandomBattingOrder(this.sessionService.getTeam(), []).subscribe({
      next: (players: Player[]) => { this.battingOrder = players; }, 
      error: () => {}
    })
  }
}
