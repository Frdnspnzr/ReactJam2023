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
  otherPlayers?: Player[];
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
  const [otherPlayers, setOtherPlayers] = useState<Player[]>([]);
  const value = useMemo(
    () =>
      ({
        allPlayers: {},
        myself: getMyself(myPlayerId, allPlayers),
        otherPlayers,
        loading: !allPlayers || !myPlayerId || otherPlayers.length === 0,
      } as PlayerInformationContextType),
    [allPlayers, myPlayerId, otherPlayers]
  );

  useEffect(() => {
    if (allPlayers && myPlayerId) {
      const filtered: Player[] = [];
      for (const p in allPlayers) {
        if (p !== myPlayerId) {
          filtered.push(allPlayers[p]);
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
