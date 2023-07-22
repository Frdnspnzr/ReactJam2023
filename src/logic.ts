import type { RuneClient } from "rune-games-sdk/multiplayer";
import {
  Ability,
  AbilitySpy,
  AbilityTrickster,
  GameState,
  Guess,
  GuessRecord,
  ROLES,
  Role,
} from "./datatypes/GameState";
import Trickster from "./components/abilities/Trickster";

type GameActions = {
  guess: (params: { player: string; role: Role; guess: Guess }) => void;
  setFinished: (params: { finished: boolean }) => void;
  disguise: (params: { disguise: Role }) => void;
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
    const abilities = initializeAbilities(roles);
    return { roles, guesses, abilities, finished: [] };
  },
  actions: {
    guess: ({ player, role, guess }, { game, playerId }) => {
      if (
        !Object.keys(game.guesses).includes(playerId) ||
        !Object.keys(game.guesses[playerId]).includes(player) ||
        !Object.keys(game.guesses[playerId][player]).includes(role)
      ) {
        throw Rune.invalidAction();
      }
      game.guesses[playerId][player][role] = guess;
      if (game.finished.includes(playerId)) {
        game.finished = game.finished.filter((f) => f !== playerId);
      }
    },
    setFinished: ({ finished }, { game, playerId, allPlayerIds }) => {
      if (finished && !playerCanFinish(playerId, game)) {
        throw Rune.invalidAction();
      }

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
    disguise: ({ disguise }, { game, playerId }) => {
      if (game.roles[playerId] !== "Trickster") {
        throw Rune.invalidAction();
      }
      const ability = getAbility(
        game.abilities,
        "Trickster"
      ) as AbilityTrickster;

      if (!ability) {
        throw Error(
          "Trickster ability not found. Game initialization went wrong."
        );
      }

      ability.disguise = disguise;
    },
  },
  events: {},
});

function initializeRoles(allPlayerIds: string[]): Record<string, Role> {
  const availableRoles: Role[] = JSON.parse(JSON.stringify(ROLES));
  availableRoles.sort(() => Math.random() - 0.5);
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

export function getScore(player: string, game: GameState): number {
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

export function playerCanFinish(player: string, game: GameState): boolean {
  for (const otherPlayer of Object.keys(game.guesses[player])) {
    const guesses = Object.keys(game.guesses[player][otherPlayer]).filter(
      (g) => game.guesses[player][otherPlayer][g] === Guess.Yes
    );
    if (guesses.length > 1) {
      return false;
    }
  }
  return true;
}
function initializeAbilities(
  roles: Record<string, "Spy" | "Puppetmaster" | "Trickster">
): Ability[] {
  const abilities: Ability[] = [];
  Object.values(roles).forEach((role) => {
    switch (role) {
      case "Trickster":
        abilities.push({ role, ability: { disguise: "Trickster" } });
        break;
      case "Spy":
        abilities.push({ role, ability: {} });
        break;
    }
  });
  return abilities;
}

function getAbility(abilities: Ability[], role: Role) {
  for (const ability of abilities) {
    if (ability.role === role) {
      return ability.ability;
    }
  }
}
