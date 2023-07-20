"use client";

import { createContext, useContext, useMemo } from "react";
import { GameState } from "../datatypes/GameState";

interface GameStateProviderProps {
  children?: React.ReactNode;
  gameState: GameState;
}

interface GameStateContextType {
  gameState?: GameState;
  loading: boolean;
}

const GameStateContext = createContext<GameStateContextType>({
  loading: true,
});

const GameStateProvider: React.FC<GameStateProviderProps> = ({
  children,
  gameState,
}) => {
  const value = useMemo(
    () => ({
      gameState,
      loading: !gameState,
    }),
    [gameState]
  );

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used inside a GameStateProvider");
  }
  return context;
}

export default GameStateProvider;
