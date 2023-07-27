export const ROLES = ["Controller", "Millstone", "Weasel"] as const;
export type Role = (typeof ROLES)[number];

export enum Guess {
  No,
  WeakNo,
  Neutral,
  WeakYes,
  Yes,
}

export type GuessRecord = Record<string, Record<string, Record<string, Guess>>>;

export interface Tasks {
  available: number;
  done: number;
}

export interface GameState {
  roles: Record<string, Role>;
  guesses: GuessRecord;
  finished: string[];
  abilities: Ability[];
  tasks: Record<string, Tasks>;
  lastTask: number;
}

export type Ability =
  | { role: "Weasel"; ability: AbilityTrickster }
  | { role: "Controller"; ability: AbilitySpy };

export interface AbilityTrickster {
  disguise: Role;
}

export type AbilitySpy = object;
