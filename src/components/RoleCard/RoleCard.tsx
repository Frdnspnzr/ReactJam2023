import classNames from "classnames";
import styles from "./rolecard.module.css";
import useRoles from "../../hooks/useRoles";
import useAbility from "../../hooks/useAbility";
import { Ability, Role } from "../../datatypes/GameState";
import Trickster from "../abilities/Trickster";
import { useState } from "react";
import Spy from "../abilities/Spy";

const RoleCard: React.FC = () => {
  const { myRole, loading: rolesLoading } = useRoles();
  const { ability, loading: abilityLoading } = useAbility();
  const [open, setOpen] = useState(true);

  if (rolesLoading || abilityLoading) {
    return <>...</>;
  } else {
    const effectiveRole = getEffectiveRole(myRole!, ability);

    return (
      <div
        className={classNames(styles.card, effectiveRole.toLowerCase(), {
          [styles.open]: open,
          [styles.closed]: !open,
        })}
      >
        <h2 className={styles.title} onClick={() => setOpen(!open)}>
          {myRole}
        </h2>
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
      case "Weasel":
        return <Trickster ability={ability.ability} />;
      case "Controller":
        return <Spy ability={ability.ability} />;
    }
  }
  return <p>This is your ability area.</p>;
}

function getEffectiveRole(role: Role, ability?: Ability) {
  if (!ability || ability.role !== "Weasel") {
    return role;
  } else {
    return ability.ability.disguise;
  }
}

export default RoleCard;
