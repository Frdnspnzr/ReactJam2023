import type { RuneClient } from "rune-games-sdk/multiplayer";
import { GameState } from "./datatypes/GameState";

type GameActions = {
  increment: (params: { amount: number }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export function getCount(game: GameState) {
  return game.count;
}

Rune.initLogic({
  minPlayers: 3,
  maxPlayers: 10,
  setup: (): GameState => {
    return { count: 0 };
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
  },
  events: {
    playerJoined: () => {
      // Handle player joined
    },
    playerLeft() {
      // Handle player left
    },
  },
});
