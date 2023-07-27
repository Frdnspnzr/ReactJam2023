import { useGameState } from "../../context/GameStateProvider";
import { AbilityHawk } from "../../datatypes/GameState";
import styles from "./hawk.module.css";

interface Props {
  ability: AbilityHawk;
}

const Hawk: React.FC<Props> = ({ ability }) => {
  const { gameState, loading } = useGameState();

  if (loading) {
    return <>...</>;
  } else {
    return (
      <>
        <p>You can see the number of open tasks of every player.</p>
        <div className={styles.roles}>
          <ul className={styles.list}>
            {Object.keys(gameState!.roles)
              .filter((player) => gameState!.roles[player] !== "Controller")
              .map((player) => {
                const role = gameState!.roles[player];
                const tasks = gameState!.tasks[player].available;
                return (
                  <li key={role}>
                    <strong>{role}</strong>: {tasks}
                  </li>
                );
              })}
          </ul>
        </div>
      </>
    );
  }
};

export default Hawk;
