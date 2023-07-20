import { useEffect, useState } from "react";
import MainScreen from "../MainScreen/MainScreen.tsx";
import GameStateProvider from "../../context/GameStateProvider.tsx";
import { GameState } from "../../datatypes/GameState.ts";
import PlayerInformationProvider from "../../context/PlayerInformationProvider.tsx";
import { Players } from "rune-games-sdk/multiplayer";

function App() {
  const [gameState, setGameState] = useState<GameState>();
  const [myPlayerId, setMyPlayerId] = useState<string>();
  const [players, setPlayers] = useState<Players>();
  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame, yourPlayerId, players }) => {
        setGameState(newGame);
        setMyPlayerId(yourPlayerId);
        setPlayers(players);
      },
    });
  }, []);

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PlayerInformationProvider myPlayerId={myPlayerId} allPlayers={players}>
        <GameStateProvider gameState={gameState}>
          <MainScreen></MainScreen>
        </GameStateProvider>
      </PlayerInformationProvider>
    </>
  );
}

export default App;
