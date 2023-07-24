import { useEffect, useState, useTransition } from "react";
import { useGameState } from "../../context/GameStateProvider";
import useTasks from "../../hooks/useTasks";
import styles from "./tasks.module.css";

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
        setDone(5000);
      }}
      onMouseUp={() => {
        if (downTime && Date.now() - downTime > 5000) {
          finishTask();
        }
        setDownTime(undefined);
        setDone(undefined);
      }}
    >
      <div className={styles.checkmark}>⚪</div>
      <div className={styles.name}>Task</div>
      <div className={styles.completion}>
        {done && done > 0 ? Math.min(100, Math.floor(done / 50)) : 0}%
      </div>
    </div>
  );
}
