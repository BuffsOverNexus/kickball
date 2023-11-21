import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getAccountId(): number {
    const accountId = localStorage.getItem("accountId");
    return Number(accountId);
  }

  isLoggedIn(): boolean {
    const accountId = localStorage.getItem("accountId");
    return accountId != null;
  }

  login(accountId: number, username: string) {
    localStorage.setItem("accountId", String(accountId));
    localStorage.setItem("username", username);
  }

  logout() {
    localStorage.removeItem("accountId");
    localStorage.removeItem("username");
  }

  setTeam(id: string) {
    localStorage.setItem("teamId", id);
  }

  getTeam() {
    const teamId = localStorage.getItem("teamId")!;
    return teamId;
  }

  hasTeam() {
    return this.getTeam() != null;
  }
}
