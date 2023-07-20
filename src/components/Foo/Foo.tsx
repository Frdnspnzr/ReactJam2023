import { useGameState } from "../../context/GameStateProvider";
import { usePlayerInformation } from "../../context/PlayerInformationProvider";

export default function Foo() {
  const { gameState } = useGameState();
  const { myself, loading } = usePlayerInformation();
  return (
    <>
      <p onClick={() => Rune.actions.increment({ amount: 1 })}>Increment</p>
      <p>{gameState?.count}</p>
      {!loading && <p>{myself?.displayName}</p>}
    </>
  );
}
