import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../team';
import { SessionService } from '../session.service';
import { Player } from '../player';
import { Gender } from '../gender';
import { TeamService } from '../team.service';
import { Roster } from '../roster';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private router: Router,
    private teamService: TeamService
  ) {}

  players: Player[] = [];

  createdPlayer: Player = {
    id: 0,
    createdAt: '',
    firstName: '',
    lastName: '',
    teamId: Number(this.sessionService.getTeam()),
    preferences: [],
    gender: 'MALE'
  };

  errors: string[] = [];

  genders: string[] = Object.keys(Gender).filter(key => !isNaN(Number(key))).map(key => (Gender as any)[key]);

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

    // Attempt to retrieve players from team.
    this.teamService.getRoster(this.sessionService.getTeam()).subscribe({
      next: (roster: Roster) => {
        this.players = roster.players; 
      },
      error: () => {}
    });
  }

  create() {
    if (!this.createdPlayer.firstName) {
      this.errors.push('You must enter in a first name.');
      return;
    }

    if (!this.createdPlayer.lastName) {
      this.errors.push('You must enter in a last name.');
      return;
    }

    // Create the player, then refresh the player list.
    this.playerService.createPlayer(this.createdPlayer.firstName, this.createdPlayer.lastName, this.createdPlayer.teamId.toString(), this.createdPlayer.preferences, this.createdPlayer.gender)
      .subscribe({
        next: (player: Player) => {
          // Created the player. Now reset all fields and update player list.
          this.createdPlayer = {
            id: 0,
            createdAt: '',
            firstName: '',
            lastName: '',
            teamId: Number(this.sessionService.getTeam()),
            preferences: [],
            gender: 'MALE'
          };

          // Update player list.
          this.teamService.getRoster(this.sessionService.getTeam()).subscribe({
            next: (roster: Roster) => {
              this.players = roster.players;
            },
            error: () => {},
          });
        }
      })
  }

}
