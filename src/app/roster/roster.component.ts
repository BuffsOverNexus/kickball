import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneratorService } from '../generator.service';
import { Player } from '../player';
import { SessionService } from '../session.service';
import { Roster } from '../roster';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit {
  constructor(
    private router: Router,
    private generatorService: GeneratorService,
    private sessionService: SessionService,
    private teamService: TeamService
  ) {}

  battingOrder: Player[] = [];
  ineligible: string[] = [];
  players: any[] = [];

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

    this.teamService.getRoster(this.sessionService.getTeam()).subscribe({
      next: (roster: Roster) => { this.players = roster.players; }
    });
  }

  generate() {
    this.generatorService.getRandomBattingOrder(this.sessionService.getTeam(), this.getIneligible()).subscribe({
      next: (players: Player[]) => { this.battingOrder = players; }, 
      error: () => {}
    });
  }

  getIneligible(): string[] {
    return this.players.filter((player) => player.ineligible).map(player => player.id);
  }

}
