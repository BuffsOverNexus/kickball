import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { SessionService } from '../session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private teamService: TeamService, private sessionService: SessionService, private router: Router, private playerService: PlayerService) {}

  teams: Team[] = [];
  selectedTeamId: string = "";
  team: Team = {
    id: 0,
    createdAt: '',
    name: '',
    accountId: this.sessionService.getAccountId()
  };

  players: Player[] = [];

  errors: string[] = [];

  ngOnInit(): void {
    // Determine if the person is logged in.
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['account']);
      return;
    }

    // Acquire all teams.
    this.teamService.getTeamsByAccount(this.sessionService.getAccountId().toString()).subscribe({
      next: (teams: Team[]) => { this.teams = teams; console.log(teams); },
      error: () => { }
    });
  }

  select() {
    if (!this.selectedTeamId) {
      this.errors.push("You must select at least one (1) team.");
      return;
    }
    
    this.sessionService.setTeam(this.selectedTeamId);
    this.router.navigate(['rosters']);
  }

  create() {
    const MINIMUM_TEAM_NAME_LENGTH = 5;
    if (!this.team.name) {
      this.errors.push("You must enter in a team name first.");
      return;
    }

    if (this.team.name.length < MINIMUM_TEAM_NAME_LENGTH) {
      this.errors.push(`You must enter in at least ${ MINIMUM_TEAM_NAME_LENGTH } characters in a team name.`);
      return;
    }

    // Create the team.
    this.teamService.createTeam(this.team.name, this.team.accountId.toString()).subscribe({
      next: (createdTeam: Team) => { 
        // Successfully created the team. Now navigate to roster page.
        this.sessionService.setTeam(createdTeam.id.toString());
        this.router.navigate(["rosters"]);
      },
      error: (error) => {
        this.errors.push("Unable to create a team with that name. Try another name!");
      }
    })
  }

}
