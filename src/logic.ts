import type { RuneClient } from "rune-games-sdk/multiplayer";
import {
  GameState,
  Guess,
  GuessRecord,
  ROLES,
  Role,
} from "./datatypes/GameState";

type GameActions = {
  guess: (params: { player: string; role: Role; guess: Guess }) => void;
  setFinished: (params: { finished: boolean }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 3,
  maxPlayers: 3,
  setup: (allPlayerIds: string[]): GameState => {
    console.log("🕹 Game setup started");
    const roles = initializeRoles(allPlayerIds);
    const guesses = initilizeGuesses(roles);
    return { roles, guesses, finished: [] };
  },
  actions: {
    guess: ({ player, role, guess }, { game, playerId }) => {
      //TODO Validation
      //TODO Unset finish state when changing guesses
      game.guesses[playerId][player][role] = guess;
    },
    setFinished: ({ finished }, { game, playerId }) => {
      //TODO Validation (Do not allow finishing when more than one Yes is guessed for any player)
      //TODO Actually finish the game
      if (finished && !game.finished.includes(playerId)) {
        game.finished.push(playerId);
      } else if (!finished && game.finished.includes(playerId)) {
        game.finished = game.finished.filter((f) => f !== playerId);
      }
    },
  },
  events: {},
});

function initializeRoles(allPlayerIds: string[]): Record<string, Role> {
  const availableRoles: Role[] = JSON.parse(JSON.stringify(ROLES));
  const roles: Record<string, Role> = {};
  for (const p of allPlayerIds) {
    const r = availableRoles.pop() as Role;
    roles[p] = r;
  }
  return roles;
}

function initilizeGuesses(roles: Record<string, Role>): GuessRecord {
  const guesses: GuessRecord = {};
  const allPlayers = Object.keys(roles);

  for (const player of allPlayers) {
    guesses[player] = {};
    const otherPlayers = allPlayers.filter((p) => p !== player);
    const otherRoles = ROLES.filter((r) => r !== roles[player]);
    for (const targetPlayer of otherPlayers) {
      guesses[player][targetPlayer] = {} as Record<string, Guess>;
      for (const role of otherRoles) {
        guesses[player][targetPlayer][role] = Guess.Neutral;
      }
    }
  }

  return guesses;
}
