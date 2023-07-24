import { useMemo } from "react";
import { useGameState } from "../context/GameStateProvider";
import { usePlayerInformation } from "../context/PlayerInformationProvider";

interface TasksInformation {
  available?: number;
  done?: number;
  finish: () => void;
  loading: boolean;
}

export default function useTasks(): TasksInformation {
  const { loading: gameStateLoading, gameState } = useGameState();
  const { myself, loading: playerInformationLoading } = usePlayerInformation();

  const result = useMemo<TasksInformation>(() => {
    if (gameStateLoading || playerInformationLoading) {
      return {
        loading: true,
        available: undefined,
        done: undefined,
        finish: () => {
          return;
        },
      };
    } else {
      const tasks = gameState!.tasks[myself!.playerId];
      return {
        loading: false,
        available: tasks.available,
        done: tasks.done,
        finish: () => {
          Rune.actions.finishTask();
        },
      };
    }
  }, [gameStateLoading, gameState, playerInformationLoading, myself]);

  return result;
}
