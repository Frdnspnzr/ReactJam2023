import { useMemo } from "react";
import { useGameState } from "../context/GameStateProvider";
import { usePlayerInformation } from "../context/PlayerInformationProvider";
import { Role } from "../datatypes/GameState";

interface RoleInformation {
  myRole?: Role;
  otherRoles?: Role[];
  loading: boolean;
}

export default function useRoles(): RoleInformation {
  const { loading: gameStateLoading, gameState } = useGameState();
  const { loading: playerInformationLoading, myself } = usePlayerInformation();

  const result = useMemo(() => {
    if (gameStateLoading || playerInformationLoading || !gameState || !myself) {
      return {
        myRole: undefined,
        otherRoles: undefined,
        loading: true,
      };
    } else {
      const myRole = gameState.roles[myself.playerId];
      const otherRoles = Object.values(gameState.roles).filter(
        (r) => r !== myRole
      );
      return {
        myRole,
        otherRoles,
        loading: false,
      };
    }
  }, [gameStateLoading, playerInformationLoading, gameState, myself]);

  return result;
}
