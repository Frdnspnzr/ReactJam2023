import { useCallback } from "react";
import { useGameState } from "../../context/GameStateProvider";
import { AbilityMillstone, Role } from "../../datatypes/GameState";
import styles from "./millstone.module.css";
import classNames from "classnames";

interface Props {
  ability: AbilityMillstone;
}

const Millstone: React.FC<Props> = ({ ability }) => {
  const { gameState, loading } = useGameState();

  const setMillstoneTarget = useCallback((target: Role) => {
    Rune.actions.setMillstoneTarget({ target });
  }, []);

  if (loading) {
    return <>...</>;
  } else {
    const availableRoles = Object.values(gameState!.roles);
    return (
      <>
        <p>You can choose another player that takes longer to finish tasks.</p>
        <div className={styles.roles}>
          {availableRoles
            .filter((r) => r !== "Millstone")
            .map((r) => (
              <button
                key={r}
                onClick={() => setMillstoneTarget(r)}
                className={classNames({
                  [styles.active]: r === ability.target,
                })}
              >
                {r}
              </button>
            ))}
        </div>
      </>
    );
  }
};

export default Millstone;
