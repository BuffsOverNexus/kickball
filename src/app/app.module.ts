import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RosterComponent } from './roster/roster.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [AppComponent, AccountComponent, TeamComponent, PlayerComponent, NavigationComponent, RosterComponent, LoginComponent, RegisterComponent, LogoutComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'players', component: PlayerComponent },
      { path: 'account', component: AccountComponent },
      { path: 'teams', component: TeamComponent },
      { path: 'rosters', component: RosterComponent },
      { path: 'logout', component: LogoutComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
