export const ROLES = ["Spy", "Puppetmaster", "Trickster"] as const;
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
  abilities: Ability[];
}

export type Ability = { role: "Trickster"; ability: AbilityTrickster };

export interface AbilityTrickster {
  disguise: Role;
}
