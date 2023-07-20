import React from "react";
import { usePlayerInformation } from "../../context/PlayerInformationProvider";
import useMyGuesses from "../../hooks/useMyGuesses";
import useRoles from "../../hooks/useRoles";
import styles from "./myguesses.module.css";
import { Guess, Role } from "../../datatypes/GameState";
import GuessBox from "../Guess/Guess";

export default function MyGuesses() {
  const { loading: guessesLoading, guesses, guess } = useMyGuesses();
  const { loading: playersLoading, otherPlayers } = usePlayerInformation();
  const { loading: rolesLoading, otherRoles } = useRoles();

  const changeGuess = (current: Guess, player: string, role: Role) => {
    let newGuess = Guess.Neutral;
    switch (current) {
      case Guess.Neutral:
        newGuess = Guess.WeakYes;
        break;
      case Guess.WeakYes:
        newGuess = Guess.Yes;
        break;
      case Guess.Yes:
        newGuess = Guess.WeakNo;
        break;
      case Guess.WeakNo:
        newGuess = Guess.No;
        break;
      case Guess.No:
        newGuess = Guess.Neutral;
        break;
    }
    guess(player, role, newGuess);
  };

  if (guessesLoading || playersLoading || rolesLoading) {
    return <>...</>;
  } else {
    return (
      <div className={styles.table}>
        {otherPlayers!.map((player) => (
          <React.Fragment key={player.playerId}>
            <div className={styles.player}>
              <img src={player.avatarUrl} className={styles.avatar} />
              <h2 className={styles.playerName}>{player.displayName}</h2>
            </div>
            {otherRoles!.map((role) => (
              <div key={role} className={styles.role}>
                <GuessBox
                  guess={guesses![player.playerId][role]}
                  onClick={() =>
                    changeGuess(
                      guesses![player.playerId][role],
                      player.playerId,
                      role
                    )
                  }
                />
                <div className={styles.roleName}>{role}</div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  }
}
