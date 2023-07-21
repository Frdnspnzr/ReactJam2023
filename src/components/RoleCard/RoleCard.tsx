import classNames from "classnames";
import styles from "./rolecard.module.css";
import useRoles from "../../hooks/useRoles";

const RoleCard: React.FC = () => {
  const { myRole, loading } = useRoles();

  if (loading) {
    return <>...</>;
  } else {
    return (
      <div
        className={classNames(styles.card, {
          [styles.spy]: myRole === "Spy",
          [styles.trickster]: myRole === "Trickster",
          [styles.puppetmaster]: myRole === "Puppetmaster",
        })}
      >
        <h2 className={styles.title}>{myRole}</h2>
        <p className={styles.text}>
          This is your role description. It tells you what your role can do.
        </p>
      </div>
    );
  }
};

export default RoleCard;
