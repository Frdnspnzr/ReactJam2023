import { useEffect, useState } from "react";
import "./App.css";
import Foo from "../Foo/Foo.tsx";
import GameStateProvider from "../../context/GameStateProvider.tsx";
import { GameState } from "../../datatypes/GameState.ts";
import PlayerInformationProvider from "../../context/PlayerInformationProvider.tsx";
import { Players } from "rune-games-sdk/multiplayer";

function App() {
  const [gameState, setGameState] = useState<GameState>({ count: 0 });
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
          <Foo></Foo>
        </GameStateProvider>
      </PlayerInformationProvider>
    </>
  );
}

export default App;
