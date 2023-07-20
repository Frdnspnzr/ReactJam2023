import classNames from "classnames";
import { Guess } from "../../datatypes/GameState";
import styles from "./guess.module.css";

interface Props {
  guess: Guess;
  onClick: () => void;
}

const GuessBox: React.FC<Props> = ({ guess, onClick }) => {
  return (
    <div
      className={classNames(styles.guess, {
        [styles.yes]: guess === Guess.Yes,
        [styles.no]: guess === Guess.No,
        [styles.weakyes]: guess === Guess.WeakYes,
        [styles.weakno]: guess === Guess.WeakNo,
      })}
      onClick={onClick}
    >
      {getGuessRepresentation(guess)}
    </div>
  );
};

function getGuessRepresentation(guess: Guess): string {
  switch (guess) {
    case Guess.WeakYes:
      return "✓";
    case Guess.Yes:
      return "✓✓";
    case Guess.No:
      return "××";
    case Guess.WeakNo:
      return "×";
    case Guess.Neutral:
      return "?";
  }
}

export default GuessBox;
