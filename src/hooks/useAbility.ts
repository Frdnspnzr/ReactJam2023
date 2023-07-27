import { useMemo } from "react";
import { Ability, Role } from "../datatypes/GameState";
import { useGameState } from "../context/GameStateProvider";
import useRoles from "./useRoles";

interface AbilityInformation {
  ability?: Ability;
  allAbilities: Ability[];
  loading: boolean;
}

export default function useAbility() {
  const { loading: gameStateLoading, gameState } = useGameState();
  const { loading: rolesLoading, myRole } = useRoles();

  const result = useMemo<AbilityInformation>(() => {
    if (gameStateLoading || rolesLoading) {
      return {
        loading: true,
        ability: undefined,
        allAbilities: [],
      };
    } else {
      return {
        loading: false,
        ability: selectAbility(gameState!.abilities, myRole!),
        allAbilities: gameState!.abilities,
      };
    }
  }, [gameStateLoading, rolesLoading, gameState, myRole]);
  return result;
}

function selectAbility(abilities: Ability[], role: Role) {
  for (const a of abilities) {
    if (a.role === role) {
      return a;
    }
  }
}
