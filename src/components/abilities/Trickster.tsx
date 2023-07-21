import { useCallback } from "react";
import { useGameState } from "../../context/GameStateProvider";
import { AbilityTrickster, Role } from "../../datatypes/GameState";
import styles from "./trickster.module.css";

interface Props {
  ability: AbilityTrickster;
}

const Trickster: React.FC<Props> = ({ ability }) => {
  const { gameState, loading } = useGameState();

  const changeDisguise = useCallback((disguise: Role) => {
    Rune.actions.disguise({ disguise });
  }, []);

  if (loading) {
    return <>...</>;
  } else {
    const availableRoles = Object.values(gameState!.roles);
    return (
      <>
        <p>You can change the color of your ability card.</p>
        <div className={styles.roles}>
          {availableRoles.map((r) => (
            <button key={r} onClick={() => changeDisguise(r)}>
              {r}
            </button>
          ))}
        </div>
      </>
    );
  }
};

export default Trickster;
