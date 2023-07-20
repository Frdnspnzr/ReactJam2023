import { useMemo } from "react";
import { useGameState } from "../context/GameStateProvider";
import { usePlayerInformation } from "../context/PlayerInformationProvider";
import { playerCanFinish } from "../logic";

interface FinishedInformation {
  iAmFinished?: boolean;
  canIFinish?: boolean;
  countFinished?: number;
  toggle: () => void;
  loading: boolean;
}

export default function useFinished(): FinishedInformation {
  const { loading: gameStateLoading, gameState } = useGameState();
  const { myself, loading: playerInformationLoading } = usePlayerInformation();

  const result = useMemo<FinishedInformation>(() => {
    if (gameStateLoading || playerInformationLoading) {
      return {
        loading: true,
        toggle: () => {
          return;
        },
      };
    } else {
      const iAmFinished = gameState!.finished.includes(myself!.playerId);
      return {
        loading: false,
        countFinished: gameState!.finished.length,
        iAmFinished,
        canIFinish: playerCanFinish(myself!.playerId, gameState!),
        toggle: () => {
          Rune.actions.setFinished({ finished: !iAmFinished });
        },
      };
    }
  }, [gameStateLoading, gameState, playerInformationLoading, myself]);

  return result;
}
