import { Player } from "./player";

export interface Roster {
  id: number;
  createdAt: string;
  name: string;
  accountId: number;
  players: Player[];
}
