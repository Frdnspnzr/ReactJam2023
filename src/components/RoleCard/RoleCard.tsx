import classNames from "classnames";
import { Role } from "../../datatypes/GameState";
import styles from "./rolecard.module.css";

interface Props {
  role: Role;
}

const RoleCard: React.FC<Props> = ({ role }) => {
  return (
    <div
      className={classNames(styles.card, {
        [styles.spy]: role === "Spy",
        [styles.trickster]: role === "Trickster",
        [styles.puppetmaster]: role === "Puppetmaster",
      })}
    >
      <h2 className={styles.title}>{role}</h2>
      <p className={styles.text}>
        This is your role description. It tells you what your role can do.
      </p>
    </div>
  );
};

export default RoleCard;
