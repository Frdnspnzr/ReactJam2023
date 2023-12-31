import { useGameState } from "../../context/GameStateProvider";
import { AbilityController } from "../../datatypes/GameState";
import styles from "./controller.module.css";
import { getScore } from "../../logic";

interface Props {
  ability: AbilityController;
}

const Controller: React.FC<Props> = ({ ability }) => {
  const { gameState, loading } = useGameState();

  if (loading) {
    return <>...</>;
  } else {
    return (
      <>
        <p>You can see the current score of every other player.</p>
        <div className={styles.roles}>
          <ul className={styles.list}>
            {Object.keys(gameState!.roles)
              .filter((player) => gameState!.roles[player] !== "Controller")
              .map((player) => {
                const role = gameState!.roles[player];
                const score = getScore(player, gameState!);
                return (
                  <li>
                    <strong>{role}</strong>: {score}
                  </li>
                );
              })}
          </ul>
        </div>
      </>
    );
  }
};

export default Controller;
