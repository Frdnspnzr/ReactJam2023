import classNames from "classnames";
import styles from "./rolecard.module.css";
import useRoles from "../../hooks/useRoles";
import useAbility from "../../hooks/useAbility";
import { Ability, Role } from "../../datatypes/GameState";
import Trickster from "../abilities/Trickster";

const RoleCard: React.FC = () => {
  const { myRole, loading: rolesLoading } = useRoles();
  const { ability, loading: abilityLoading } = useAbility();

  if (rolesLoading || abilityLoading) {
    return <>...</>;
  } else {
    const effectiveRole = getEffectiveRole(myRole!, ability);

    return (
      <div
        className={classNames(styles.card, {
          [styles.spy]: effectiveRole === "Spy",
          [styles.trickster]: effectiveRole === "Trickster",
          [styles.puppetmaster]: effectiveRole === "Puppetmaster",
        })}
      >
        <h2 className={styles.title}>{myRole}</h2>
        {!abilityLoading && (
          <div className={styles.ability}>{getAbilityComponent(ability)}</div>
        )}
      </div>
    );
  }
};

function getAbilityComponent(ability?: Ability) {
  if (ability) {
    switch (ability.role) {
      case "Trickster":
        return <Trickster ability={ability.ability} />;
    }
  }
  return <p>This is your ability area.</p>;
}

function getEffectiveRole(role: Role, ability?: Ability) {
  if (!ability || ability.role !== "Trickster") {
    return role;
  } else {
    return ability.ability.disguise;
  }
}

export default RoleCard;
