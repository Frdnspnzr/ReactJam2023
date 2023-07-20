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
      game.guesses[playerId][player][role] = guess;
      if (game.finished.includes(playerId)) {
        game.finished = game.finished.filter((f) => f !== playerId);
      }
    },
    setFinished: ({ finished }, { game, playerId, allPlayerIds }) => {
      //TODO Validation (Do not allow finishing when more than one Yes is guessed for any player)
      if (finished && !game.finished.includes(playerId)) {
        game.finished.push(playerId);
      } else if (!finished && game.finished.includes(playerId)) {
        game.finished = game.finished.filter((f) => f !== playerId);
      }

      if (game.finished.length === allPlayerIds.length) {
        const players: Record<string, number> = {};
        allPlayerIds.forEach((p) => {
          players[p] = getScore(p, game);
        });
        Rune.gameOver({ players });
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

function getScore(player: string, game: GameState): number {
  let score = 0;
  Object.keys(game.guesses[player]).forEach((otherPlayer) => {
    const guess = Object.keys(game.guesses[player][otherPlayer]).find(
      (g) => game.guesses[player][otherPlayer][g] === Guess.Yes
    );
    if (guess && game.roles[otherPlayer] === guess) {
      score++;
    }
  });
  return score;
}
