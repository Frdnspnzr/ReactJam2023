"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Player, Players } from "rune-games-sdk/multiplayer";

interface PlayerInformationProviderProps {
  children?: React.ReactNode;
  allPlayers?: Players;
  myPlayerId?: string;
}

interface PlayerInformationContextType {
  allPlayers: Players;
  myself?: Player;
  otherPlayers?: Players;
  loading: boolean;
}

const PlayerInformationContext = createContext<PlayerInformationContextType>({
  loading: true,
  allPlayers: {},
});

function getMyself(
  myPlayerId: string | undefined,
  allPlayers: Players | undefined
): Player | undefined {
  if (!myPlayerId || !allPlayers) {
    return undefined;
  } else if (Object.keys(allPlayers).includes(myPlayerId)) {
    return allPlayers[myPlayerId];
  } else {
    return undefined;
  }
}

const PlayerInformationProvider: React.FC<PlayerInformationProviderProps> = ({
  children,
  allPlayers,
  myPlayerId,
}) => {
  const [otherPlayers, setOtherPlayers] = useState<Players>();
  const value = useMemo(
    () =>
      ({
        allPlayers: {},
        myself: getMyself(myPlayerId, allPlayers),
        otherPlayers,
        loading: !allPlayers || !myPlayerId,
      } as PlayerInformationContextType),
    [allPlayers, myPlayerId, otherPlayers]
  );

  useEffect(() => {
    if (allPlayers && myPlayerId) {
      const filtered: Players = {};
      for (const p in allPlayers) {
        if (p !== myPlayerId) {
          filtered[p] = allPlayers[p];
        }
      }
      setOtherPlayers(filtered);
    }
  }, [allPlayers, myPlayerId]);

  return (
    <PlayerInformationContext.Provider value={value}>
      {children}
    </PlayerInformationContext.Provider>
  );
};

export function usePlayerInformation() {
  const context = useContext(PlayerInformationContext);
  if (!context) {
    throw new Error(
      "usePlayerInformation must be used inside a PlayerInformationProvider"
    );
  }
  return context;
}

export default PlayerInformationProvider;
