import { useMemo } from "react";
import { useGameState } from "../context/GameStateProvider";
import { usePlayerInformation } from "../context/PlayerInformationProvider";
import { Guess, Role } from "../datatypes/GameState";

interface GuessInformation {
  guesses?: Record<string, Record<Role, Guess>>;
  guess: (player: string, role: Role, guess: Guess) => void;
  loading: boolean;
}

export default function useMyGuesses(): GuessInformation {
  const { loading: gameStateLoading, gameState } = useGameState();
  const { myself, loading: playerInformationLoading } = usePlayerInformation();

  const result = useMemo<GuessInformation>(() => {
    if (gameStateLoading || playerInformationLoading) {
      return {
        guess: () => {
          return;
        },
        loading: true,
      };
    } else {
      return {
        guesses: gameState?.guesses[myself!.playerId],
        guess: (player: string, role: Role, guess: Guess) => {
          Rune.actions.guess({
            player,
            role,
            guess,
          });
        },
        loading: false,
      };
    }
  }, [gameStateLoading, playerInformationLoading, myself, gameState]);

  return result;
}
