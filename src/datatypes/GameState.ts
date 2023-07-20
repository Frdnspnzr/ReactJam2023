export const ROLES = ["Spy", "Puppetmaster", "Great Additional Role"] as const;
export type Role = (typeof ROLES)[number];

export enum Guess {
  No,
  WeakNo,
  Neutral,
  WeakYes,
  Yes,
}

export type GuessRecord = Record<string, Record<string, Record<string, Guess>>>;

export interface GameState {
  roles: Record<string, Role>;
  guesses: GuessRecord;
  finished: string[];
}
