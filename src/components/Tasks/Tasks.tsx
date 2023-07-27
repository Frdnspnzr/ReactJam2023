import { useEffect, useState, useTransition } from "react";
import useTasks from "../../hooks/useTasks";
import styles from "./tasks.module.css";
import useAbility from "../../hooks/useAbility";
import { Ability, AbilityMillstone, Role } from "../../datatypes/GameState";
import useRoles from "../../hooks/useRoles";

export default function Tasks() {
  const { loading, available, done, finish } = useTasks();

  if (loading) {
    return "...";
  }

  return (
    <>
      <h1>Tasks</h1>
      <div className={styles.list}>
        {Array.apply(undefined, { length: available }).map((_, i) => {
          return <Task key={i} finishTask={finish} />;
        })}
        <div className={styles.done}>{done} tasks done</div>
      </div>
    </>
  );
}

function Task({ finishTask }: { finishTask: () => void }) {
  const [downTime, setDownTime] = useState<number>();
  const [done, setDone] = useState<number>();
  const { allAbilities } = useAbility();
  const { myRole } = useRoles();

  const timeToFinish = getTimeToFinish(allAbilities, myRole!);
  console.log("🚀 ~ file: Tasks.tsx:35 ~ Task ~ timeToFinish:", timeToFinish);

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (!isPending) {
      startTransition(() => {
        if (downTime) {
          setDone(Date.now() - downTime);
        }
      });
    }
  }, [done, downTime, isPending]);

  return (
    <div
      className={styles.task}
      onMouseDown={() => {
        setDownTime(Date.now());
        setDone(timeToFinish);
      }}
      onMouseUp={() => {
        if (downTime && Date.now() - downTime > timeToFinish) {
          finishTask();
        }
        setDownTime(undefined);
        setDone(undefined);
      }}
    >
      <div className={styles.checkmark}>⚪</div>
      <div className={styles.name}>Task</div>
      <div className={styles.completion}>
        {done && done > 0
          ? Math.min(100, Math.floor(done / (timeToFinish / 100)))
          : 0}
        %
      </div>
    </div>
  );
}

function getTimeToFinish(abilities: Ability[], myRole: Role) {
  const millstone = abilities.find((a) => a.role === "Millstone");
  if (millstone && (millstone.ability as AbilityMillstone).target === myRole) {
    return 10000;
  }
  return 5000;
}
